export default async () => {
  return new Response(
    process.env.FIREBASE_KEY || 'No Firebase Key Found',
  )
}
