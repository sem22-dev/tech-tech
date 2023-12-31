
// pages/api/followercount.js
export default async function handler(req, res) {
    try {
      const apiResponse = await fetch('http://35.154.19.254:3000/followercount');
      if (!apiResponse.ok) {
        throw new Error(`Failed to fetch data: ${apiResponse.statusText}`);
      }
      const data = await apiResponse.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
  