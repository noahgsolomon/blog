import { InferenceSession, Tensor } from 'onnxruntime-web'

import * as ort from 'onnxruntime-web'

ort.InferenceSession
ort.env.wasm.numThreads = 1
ort.env.wasm.wasmPaths = {
  'ort-wasm-simd.wasm': '/model/ort-wasm-simd.wasm',
  'ort-wasm.wasm': '/model/ort-wasm.wasm',
}

export async function createModelGpu(model: ArrayBuffer): Promise<InferenceSession> {
  return await InferenceSession.create(model, { executionProviders: ['webgl'] })
}
export async function createModelCpu(model: ArrayBuffer): Promise<InferenceSession> {
  return await InferenceSession.create(model, {
    executionProviders: ['wasm'],
  })
}

export async function warmupModel(model: InferenceSession, inputSize: number) {
  // OK. we generate a random input and call Session.run() as a warmup query
  const warmupTensor = new Tensor('float32', new Float32Array(inputSize), [1, inputSize])

  for (let i = 0; i < inputSize; i++) {
    warmupTensor.data[i] = 0
  }

  try {
    const feeds: Record<string, Tensor> = {}
    feeds[model.inputNames[0]] = warmupTensor
    await model.run(feeds)
  } catch (e) {
    console.error(e)
  }
}

export async function runModel(model: InferenceSession, input: number[][], inputSize: number) {
  const start = new Date()
  const outputs: number[] = []
  const inferenceTimes: number[] = []

  for (const singleInput of input) {
    const tensor = new Tensor('float32', new Float32Array(singleInput), [1, inputSize])

    try {
      const feeds: Record<string, Tensor> = {}
      feeds[model.inputNames[0]] = tensor
      const outputData = await model.run(feeds)
      const end = new Date()
      const inferenceTime = end.getTime() - start.getTime()
      const output = outputData[model.outputNames[0]].data[0]
      outputs.push(Number(output))
      inferenceTimes.push(inferenceTime)
    } catch (e) {
      console.error(e)
      throw new Error()
    }
  }

  const averageInferenceTime = inferenceTimes.reduce((a, b) => a + b, 0) / inferenceTimes.length
  return [outputs, averageInferenceTime]
}
