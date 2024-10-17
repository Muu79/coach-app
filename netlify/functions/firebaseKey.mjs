// I want to get the env variable
//process.env.FIREBASE_KEY || 'No Firebase Key Found',
export default async () => {
  return Response.json({ key: process.env.FIREBASE_KEY || 'No Firebase Key Found' });
};
