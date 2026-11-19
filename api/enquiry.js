export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body || {};
    const refId = 'TORNA-' + Math.floor(100000 + Math.random() * 900000);
    return res.status(200).json({
      success: true,
      message: 'Your bespoke journey inquiry has been successfully received by Torna Holidays.',
      referenceId: refId,
      timestamp: new Date().toISOString(),
      data
    });
  } else if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  } else {
    return res.status(200).json({ status: 'ok', service: 'Torna Holidays Enquiry API' });
  }
}
