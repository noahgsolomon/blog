import hljs from 'highlight.js'
import hljsZig from 'highlightjs-zig'
import { Metadata } from 'next'
import Blog from '@/blog'
// Register Zig language for highlight.js
hljs.registerLanguage('zig', hljsZig)

export const metadata: Metadata = {
  title: 'Writing a Lexer in Zig',
  description:
    'How to implement a lexer in Zig for a simple interpreted programming language, including concepts like lexemes, tokens, and scanning source code, with detailed steps and code examples.',
  keywords: ['zig', 'lexer', 'interpreter'],
}

const md = `
**So we want to make a programming language**, and we just wrote a file which kinda looks like it's written in a programming language, but this language doesn't exist. The question is, how do we build this language ourselves so that we can execute this file? Before we get into it I want to mention this is a zig implementation of what is built in java in the [Crafting Interpreters](https://craftinginterpreters.com/) book (it's a goated book 10/10 recommend).

The first step for any programming language fundamentally, is to go from a string, to a list of strings. The string we're referring to is the source code. The list of strings we're referring to are known as lexemes. A lexeme is the smallest unit of any language, and comprises things like keywords, characters like "(", "&", etc. Now, we should have a way to differentiate those lexemes from each other based on their "type". This is where tokens come into play. We want to have a data structure that holds more information about a given lexeme than just its string value in the source code.

A good start would be storing its type (like what keyword it is, if it is an identifier, a string literal, numeric literal, not equal sign, etc.), it's lexeme, and it's literal value (which will be void for all lexemes that aren't numeric or string literals). We'll also store the line number we found this lexeme on for debugging purposes. We'll later use these tokens to make a unified data structure called the parse tree / abstract syntax tree which will signify the actual meaning behind the program.  

So to take an example, if we have a file which just contains the text '"hello world"' in it, the only token our scanner should generate would look like this:

\`\`\`zig
{
	type: STRING,
	lexeme: '"hello world"',
	literal: 'hello world',
	line: 1
}

\`\`\`

## Motivating the Problem

To motivate our problem, we are given this file called hello.zlox, and we want to output its tokens. We want to go from this:

\`\`\`zig
fun addPair(a, b) {
  return a + b;
}

fun identity(a) {
  return a;
}

print identity(addPair)(1, 2); // Prints "3".
\`\`\`

to this:

\`\`\`
FUN IDENTIFIER LEFT_PAREN IDENTIFIER COMMA IDENTIFIER RIGHT_PAREN LEFT_BRACE
RETURN IDENTIFIER PLUS IDENTIFIER SEMICOLON
RIGHT_BRACE

FUN IDENTIFIER LEFT_PAREN IDENTIFIER RIGHT_PAREN LEFT_BRACE
RETURN IDENTIFIER SEMICOLON
RIGHT_BRACE

PRINT IDENTIFIER LEFT_PAREN IDENTIFIER RIGHT_PAREN LEFT_PAREN (INT: 1) COMMA (INT: 2) RIGHT_PAREN SEMICOLON
\`\`\`

If you wanted the big picture and nothing else you're free to leave here. But for any based zig enjoyer looking to see a simple implementation of a scanner in zig, join me.

## Implementation Steps

Let's map out how we want to do this into steps, it really isn't that hard.  
Our goal is to be able to run \`zlox src/hello.zlox\` or \`zlox\` . The second option is called a **REPL** (_Read Evaluate Print Loop_) and it's a must for any interpreted language. So let's start here: reading from a file, and std io.

\`\`\`zig
const std = @import("std");
const print = std.debug.print;

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{ .thread_safe = true }){};
    const alloc = gpa.allocator();

    defer {
        if (gpa.deinit() == .leak) {
            std.log.err("Memory leak", .{});
        }
    }
    const args = try std.process.argsAlloc(alloc);
    defer std.process.argsFree(alloc, args);

    if (args.len == 1) {
        // ?
    } else if (args.len == 2) {
        // ?
    } else {
        std.log.err("Cannot input more than 1 arg. Use examples: zlox, zlox hello.zlox", .{});
        return;
    }
}
\`\`\`

## Using the Zig Build System

Before we go any further, let's talk about how we're using the zig build system to compile our program, and how we can add this executable into our PATH so that we can run 'zlox' instead of '/path/to/zig-out/bin/'.

\`\`\`zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "zlox",
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });
    b.installArtifact(exe);
}
\`\`\`

Zig has its own build system, and this is the build file build.zig. When we run zig build, zig calls this function and passes in a build struct which is our way of changing the build options for this programs compilation. It is basically a way to specify how your program is compiled, linked, and executed. There is a ton you can do with it but for now we're keeping it simple and specifying an executable for our current OS (you can cross compile w/ zig build 🤯) and installing it.

When we run \`zig build\` we are created our programs executable which will live at ./zig-out/bin/zlox. Now, we can just add this to our ~/.zshrc file: \`export PATH=$PATH:/path/to/root/zig-out/bin"\`

## Implementing the Scanner

So now, back to our Scanner. Our language is called ZLox, and the core ways we interface with it is by executing a file, or line by line from user input.

\`\`\`zig
pub const ZLox = struct {

	pub fn scanFile(path: []const u8, alloc: std.mem.Allocator) !void {
        // Open the file at the specified path in the current working directory.
        const file = std.fs.cwd().openFile(path, .{}) catch |err| {
            std.log.err("Failed to open file: {s}\n{s}", .{ path, @errorName(err) });
            return;
        };
        defer file.close();

        // Read the entire file into memory, allocating space using the provided allocator.
        const source = file.reader().readAllAlloc(alloc, std.math.maxInt(usize)) catch |err| {
            std.log.err("Failed to read file: {s}", .{@errorName(err)});
            return;
        };
        defer alloc.free(source);

        // unimplemented scanner
        var scanner = try Scanner.init(alloc);
        defer scanner.deinit();

        // Scan the source code using the scanner.
        try scan(source, &scanner);
    }

    pub fn scanPrompt(alloc: std.mem.Allocator) !void {
        const in = std.io.getStdIn().reader();
        const out = std.io.getStdOut().writer();

         // unimplemented scanner
        var scanner = try Scanner.init(alloc);
        defer scanner.deinit();

        // Enter an infinite loop to continuously prompt the user for input.
        while (true) {
            try out.print("> ", .{});
            // Read a line of input from the user, allocating memory for the line.
            const source = try in.readUntilDelimiterAlloc(alloc, '\n', std.math.maxInt(usize));

            // If the input isn't empty or just a newline, process the input.
            if (source.len > 0 and !std.ascii.eqlIgnoreCase(source, "\n")) {
                try scan(source, &scanner); // Scan the input by the user.
                try out.print("\n", .{});
            }
        }
    }
}
\`\`\`

In the above snippet, we can read a source file or read user input. Now we just need a way to actually _scan_ this source code. Before we go into the unimplemented scan function, let's implement the Scanner struct.

### Scanner Struct Requirements

Let's talk about some things we need for our scanner. So, at any given moment, we are either in the middle of scanning a lexeme, or, we just created a token from a lexeme, and are now ready to start reading a new lexeme. We need to know the current lexeme's start index, and our current index in the source code.

\`\`\`zig
const std = @import("std");
const token = @import("token.zig");
const Token = token.Token;
const TokenType = token.TokenType;

pub const Scanner = struct {
    start: usize,
    current: usize,
    line: usize,

    // the running list of tokens we scan from the source code
    tokens: std.ArrayList(Token),
    alloc: std.mem.Allocator,

    // all the source code from our file or user input
    source: []const u8,

    // string to TokenType (enum) map (e.g. "and" -> TokenType.AND)
    keyword_map: std.StringHashMap(TokenType),

    pub fn init(alloc: std.mem.Allocator) !Scanner {
        return Scanner{ .source = "", .start = 0, .current = 0, .line = 1, .alloc = alloc, .tokens = std.ArrayList(Token).init(alloc), .keyword_map = token.initKeywords(alloc) };
    }

    pub fn deinit(self: *Scanner) void {
        self.tokens.deinit();
        self.keyword_map.deinit();
    }
};
\`\`\`

Now that we have all the necessary state for our scanner defined, we need to encapsulate the scanner's behaviors. Firstly, we need to be able to scan tokens. We talked above about what form our tokens will take, and we see a reference to a Token as a type above, so let's start implementing it. So we said we need to store the type of the lexeme, the actual string lexeme, the literal (if applicable), and what line the lexeme is on (which is just how many \n's we've seen up to this point). We should also add a print function to be able to view the tokens. We can use zig's tagged union for this the literal type.

### Token Implementation

\`\`\`zig
// woah, it's a tagged union chat 😱
pub const Literal = union(enum) { void, int: i64, float: f64, str: []const u8 };

pub const TokenType = enum {
    // Single-character tokens.
    LEFT_PAREN,
    RIGHT_PAREN,
    LEFT_BRACE,
    RIGHT_BRACE,
    COMMA,
    DOT,
    MINUS,
    PLUS,
    SEMICOLON,
    SLASH,
    STAR,

    // One or two character tokens.
    BANG,
    BANG_EQUAL,
    EQUAL,
    EQUAL_EQUAL,
    GREATER,
    GREATER_EQUAL,
    LESS,
    LESS_EQUAL,

    // Literals.
    IDENTIFIER,
    STRING,
    INT,
    FLOAT,

    // Keywords.
    AND,
    CLASS,
    ELSE,
    FALSE,
    FUN,
    FOR,
    IF,
    NIL,
    OR,
    PRINT,
    RETURN,
    SUPER,
    THIS,
    TRUE,
    VAR,
    WHILE,

    EOF,
};
\`\`\`

For the Token print function we will have a switch case over our tagged union. Zig tagged unions are very based you'll learn to love them. Switch cases in zig need to be exhaustive and you can capture the value from the non-null field in the tagged union like below.

\`\`\`zig
pub const Token = struct {
    type: TokenType,
    lexeme: []const u8,
    literal: Literal,
    line: usize,

    pub fn print(self: Token) void {
        switch (self.literal) {
            .void => std.debug.print("{s} ", .{@tagName(self.type)}),
            .int => |value| std.debug.print("({s}: {d}) ", .{ @tagName(self.type), value }),
            .float => |value| std.debug.print("({s}: {d:.2}) ", .{ @tagName(self.type), value }),
            .str => |value| std.debug.print("({s}: {s}) ", .{ @tagName(self.type), value }),
        }
    }
};
\`\`\`

One more thing before we go back to the scanner struct to finish the rest of our scanner implementation. Do you remember our keyword_map, and how it was being initialized in the Scanners init function? What is that?

\`\`\`zig
keyword_map: std.StringHashMap(TokenType),

    pub fn init(alloc: std.mem.Allocator) !Scanner {
        return Scanner{ .source = "", .start = 0, .current = 0, .line = 1, .alloc = alloc, .tokens = std.ArrayList(Token).init(alloc), .keyword_map = token.initKeywords(alloc) };
    }
\`\`\`

It's just a hashmap with string keys and TokenType values. We have a handful of reserved keywords. But we need to actually reserve them so that's what we're using the hashmap for.

\`\`\`zig
pub fn initKeywords(allocator: std.mem.Allocator) std.StringHashMap(TokenType) {
    var keywords = std.StringHashMap(TokenType).init(allocator);
    keywords.put("and", TokenType.AND) catch unreachable;
    keywords.put("class", TokenType.CLASS) catch unreachable;
    keywords.put("else", TokenType.ELSE) catch unreachable;
    keywords.put("false", TokenType.FALSE) catch unreachable;
    keywords.put("for", TokenType.FOR) catch unreachable;
    keywords.put("fun", TokenType.FUN) catch unreachable;
    keywords.put("if", TokenType.IF) catch unreachable;
    keywords.put("nil", TokenType.NIL) catch unreachable;
    keywords.put("or", TokenType.OR) catch unreachable;
    keywords.put("print", TokenType.PRINT) catch unreachable;
    keywords.put("return", TokenType.RETURN) catch unreachable;
    keywords.put("super", TokenType.SUPER) catch unreachable;
    keywords.put("this", TokenType.THIS) catch unreachable;
    keywords.put("true", TokenType.TRUE) catch unreachable;
    keywords.put("var", TokenType.VAR) catch unreachable;
    keywords.put("while", TokenType.WHILE) catch unreachable;
    return keywords;
}
\`\`\`

We have now implemented all besides the actual token scanning. We need to have a way to read from the source code from index 0, to the end of file. We can make a scanTokens function for this purpose.

\`\`\`zig
 pub fn scanTokens(self: *Scanner) !std.ArrayList(Token) {
        while (!self.isAtEnd()) {
            self.start = self.current;
            try self.scanToken();
        }
        return self.tokens;
    }

pub fn isAtEnd(self: Scanner) bool {
        return self.current >= self.source.len;
    }
\`\`\`

### Scanning Tokens

All we do when scanning a given lexeme and making it a token is reading the lexeme and then making it a token. It's really simple. So a single long switch case each calling an addToken function, or some function that itself calls addToken. Enough yapping let's see this addToken function.

\`\`\`zig
 pub fn addToken(self: *Scanner, token_type: TokenType, literal: Literal) !void {
        try self.tokens.append(Token{ .type = token_type, .literal = literal, .line = self.line, .lexeme = self.source[self.start..self.current] });
    }
\`\`\`

Now that we have this function implemented, we are able to create tokens for 1 character lexemes

\`\`\`zig
 pub fn scanToken(self: *Scanner) !void {
        const c = self.advance();
        switch (c) {
            '(' => try self.addToken(TokenType.LEFT_PAREN, Literal{ .void = {} }),
            ')' => try self.addToken(TokenType.RIGHT_PAREN, Literal{ .void = {} }),
            '{' => try self.addToken(TokenType.LEFT_BRACE, Literal{ .void = {} }),
            '}' => try self.addToken(TokenType.RIGHT_BRACE, Literal{ .void = {} }),
            ',' => try self.addToken(TokenType.COMMA, Literal{ .void = {} }),
            '.' => try self.addToken(TokenType.DOT, Literal{ .void = {} }),
            '-' => try self.addToken(TokenType.MINUS, Literal{ .void = {} }),
            '+' => try self.addToken(TokenType.PLUS, Literal{ .void = {} }),
            ';' => try self.addToken(TokenType.SEMICOLON, Literal{ .void = {} }),
            '*' => try self.addToken(TokenType.STAR, Literal{ .void = {} }),
			else => {
                ZLox.scanError(self.line, "Unexpected character.");
            },
		}
}

 pub fn advance(self: *Scanner) u8 {
        const c = self.source[self.current];
        self.current += 1;
        return c;
    }
\`\`\`

We have other single character lexemes, but they can be longer lexemes depending on what character(s) proceed it. Take < for example. and =. "<=" is not a LESS_THAN, and EQUAL lexeme. It a single LESS_THAN_EQUAL lexeme. So for characters at the start of a lexeme with dependencies from characters that come after it, we need to look at the character that follows. We'll use a match function to have a token type conditional on whether the next character is something we expect.

\`\`\`zig
switch (c) {
// ...
 '!' => try self.addToken(if (self.match('=')) TokenType.BANG_EQUAL else TokenType.BANG, Literal{ .void = {} }),
 '=' => try self.addToken(if (self.match('=')) TokenType.EQUAL_EQUAL else TokenType.EQUAL, Literal{ .void = {} }),
 '<' => try self.addToken(if (self.match('=')) TokenType.LESS_EQUAL else TokenType.LESS, Literal{ .void = {} }),
 '>' => try self.addToken(if (self.match('=')) TokenType.GREATER_EQUAL else TokenType.GREATER, Literal{ .void = {} }),
// ...
}

pub fn match(self: *Scanner, expected: u8) bool {
        if (self.isAtEnd()) return false;

        if (self.source[self.current] != expected) {
            return false;
        }

        self.current += 1;
        return true;
    }
\`\`\`

Now we don't need to generate tokens for comments, because they have no effect on how our program will run and execute, and our comments are single line, so we will skip all characters following // until we find \n. We also need to handle the case where there is only 1 slash like for division.

\`\`\`zig
switch (c) {
// ...
  '/' => {
                if (self.match('/')) {
                    while (self.peek() != '\n' and !self.isAtEnd()) _ = self.advance();
                } else {
                    try self.addToken(TokenType.SLASH, Literal{ .void = {} });
                }
       },
// ...
}
\`\`\`

The last 4 big types we need to handle are numbers, strings, identifiers and keywords.

\`\`\`zig
    pub fn scanToken(self: *Scanner) !void {
        const c = self.advance();
        switch (c) {
            // Single-character tokens
            '(' => try self.addToken(TokenType.LEFT_PAREN, Literal{ .void = {} }),
            ')' => try self.addToken(TokenType.RIGHT_PAREN, Literal{ .void = {} }),
            '{' => try self.addToken(TokenType.LEFT_BRACE, Literal{ .void = {} }),
            '}' => try self.addToken(TokenType.RIGHT_BRACE, Literal{ .void = {} }),
            ',' => try self.addToken(TokenType.COMMA, Literal{ .void = {} }),
            '.' => try self.addToken(TokenType.DOT, Literal{ .void = {} }),
            '-' => try self.addToken(TokenType.MINUS, Literal{ .void = {} }),
            '+' => try self.addToken(TokenType.PLUS, Literal{ .void = {} }),
            ';' => try self.addToken(TokenType.SEMICOLON, Literal{ .void = {} }),
            '*' => try self.addToken(TokenType.STAR, Literal{ .void = {} }),
            // One or two character tokens
            '!' => try self.addToken(if (self.match('=')) TokenType.BANG_EQUAL else TokenType.BANG, Literal{ .void = {} }),
            '=' => try self.addToken(if (self.match('=')) TokenType.EQUAL_EQUAL else TokenType.EQUAL, Literal{ .void = {} }),
            '<' => try self.addToken(if (self.match('=')) TokenType.LESS_EQUAL else TokenType.LESS, Literal{ .void = {} }),
            '>' => try self.addToken(if (self.match('=')) TokenType.GREATER_EQUAL else TokenType.GREATER, Literal{ .void = {} }),
            '/' => {
                if (self.match('/')) {
                    // A comment goes until the end of the line
                    while (self.peek() != '\n' and !self.isAtEnd()) _ = self.advance();
                } else {
                    try self.addToken(TokenType.SLASH, Literal{ .void = {} });
                }
            },
            // Whitespace characters
            ' ' => {},
            '\r' => {},
            '\t' => {},
            '\n' => self.line += 1,
            // String literals
            '"' => try self.string(),
            // Number literals
            '0'...'9' => try self.number(),
            // Identifiers and keywords
            'A'...'Z', 'a'...'z', '_' => try self.identifier(),
            else => {
                ZLox.scanError(self.line, "Unexpected character.");
            },
        }
    }

\`\`\`

For our case, as shown in the identifier tagged union, we know we can have an int and a float type for a number. The only thing differentiating an int from a float, is that one of them contains a . after a sequence of numbers and is followed by more numbers, and one doesn't. We need to grab all the numeric characters until we reach a non numeric character. Then we must see if this next character is a '.' then repeat. Simple enough

\`\`\`zig
pub fn number(self: *Scanner) !void {
        var is_int = true;
        while (std.ascii.isDigit(self.peek())) {
            _ = self.advance();
        }

        if (self.peek() == '.' and std.ascii.isDigit(self.peekNext())) {
            is_int = false;
            _ = self.advance();
            while (std.ascii.isDigit(self.peek())) {
                _ = self.advance();
            }
        }

        if (is_int) {
            const int = try std.fmt.parseInt(i64, self.source[self.start..self.current], 10);
            try self.addToken(TokenType.INT, Literal{ .int = int });
        } else {
            const float = try std.fmt.parseFloat(f64, self.source[self.start..self.current]);
            try self.addToken(TokenType.FLOAT, Literal{ .float = float });
        }
    }
\`\`\`

### Handling Ambiguity: Maximal Munch

Sometimes there is ambiguity in the string of text that is the source code, which lexeme we should choose? Sometimes it seems ambiguous. Take an example where our language has a reserved word of 'or', and we have a line \`const orrrrr = 2;\` if we simply had a switch condition for 'o', and checked if the proceeding character is 'r', we would have 'or' be a lexeme instead of what it should be which is 'orrrrr'. This is the motivation behind the concept of **maximal munch**. The logic being we will choose the lexeme based on the string of text we're currently on based on whichever is the longest lexeme we can make taking highest precedence, followed by lexemes we can make with fewer characters taking less precedence.

_"Maximal munch means we can't easily detect a reserved word until we've reached the end of what might instead be an identifier."_

\`\`\`zig
pub fn identifier(self: *Scanner) !void {
        while (std.ascii.isAlphanumeric(self.peek())) {
            _ = self.advance();
        }

        // Check if the identifier is a reserved keyword
        var token_type = TokenType.IDENTIFIER;
        const keyword = self.keyword_map.get(self.source[self.start..self.current]);

        if (keyword) |value| {
            token_type = value;
        }

        try self.addToken(token_type, Literal{ .void = {} });
    }
\`\`\`

### Handling Strings

Lastly, we need to handle strings. We know all strings will start with '"', so all we have to do to get the entire string is loop through the characters in the source code until we find the next '"'. Though, many languages do not allow multi-line strings including ours. So we should make sure no character in between the quotations is \n, if it is we send an error. The lexeme of a string would include the quotations but its actual _value_ does not include the quotations, because quotes are only used to differentiate between keywords or identifiers and string literals. We don't actually allocate memory for the quotations of a string in its value.

\`\`\`zig
    pub fn string(self: *Scanner) !void {
        while (self.peek() != '"' and !self.isAtEnd()) {
            if (self.peek() == '\n') {
                ZLox.scanError(self.line, "Invalid, cannot have multi-line string literals");
                self.line += 1;
                return;
            }
            _ = self.advance();
        }

        if (self.isAtEnd()) {
            ZLox.scanError(self.line, "Unterminated string.");
            return;
        }

        _ = self.advance();
        const value = self.source[self.start + 1 .. self.current - 1];
        try self.addToken(TokenType.STRING, Literal{ .str = value });
    }
\`\`\`

## Putting it all together

Remember that scan function we didn't implement? This is being called by scanPrompt and scanFile. All it does is set the source we will be scanning, scan all tokens from it, and print each token.

\`\`\`zig
    pub fn scan(source: []const u8, scanner: *Scanner) !void {
        scanner.source = source;
        const tokens = try scanner.scanTokens();
        var line: usize = 1;
        for (tokens.items) |token| {
            while (line < token.line) {
                line += 1;
                print("\n", .{});
            }
            token.print();
        }
    }
\`\`\`

## Conclusion

We can now build our program with \`zig build\` and will now be able to scan source code. Thanks for reading this far if you enjoyed this please lmk @ [x.com/noahgsolomon](https://x.com/noahgsolomon) We are so back fam.
`

export default function Page() {
  return <Blog md={md} date='aug 25, 2024' />
}
