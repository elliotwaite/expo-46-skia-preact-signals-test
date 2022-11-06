import { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web'

// // If you uncomment these lines you will get an error.
// import { signal } from '@preact/signals-react'
// const count = signal(0)
// console.log('count', count.value)

const CANVASKIT_WASM_VERSION = '0.35.0' // From 'node_modules/canvaskit-wasm/package.json'.

export default function App() {
  const [loadSkia, setLoadSkia] = useState(false)

  useEffect(() => {
    setLoadSkia(true)
  }, [setLoadSkia])

  return (
    <View style={styles.container}>
      {loadSkia && (
        <WithSkiaWeb
          opts={{
            locateFile: (file: string) =>
              `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${CANVASKIT_WASM_VERSION}/bin/full/${file}`,
          }}
          getComponent={() => import('./HelloWorld')}
          fallback={
            <Text style={{ textAlign: 'center' }}>Loading Skia...</Text>
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
})
