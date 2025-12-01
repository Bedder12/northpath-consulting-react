export default function calcScore(app: any) {
  let score = 0;

  if (app.linkedin) score += 20;
  if (app.about?.length > 100) score += 20;
  if (app.about?.length > 200) score += 10;

  const keywords = ["developer", "utvecklare", "senior", "lead", "5 år", "projekt"];
  if (keywords.some((k) => app.about?.toLowerCase().includes(k))) score += 20;

  if (app.file_url) score += 30;

  return Math.min(score, 100);
}
