import { rest } from "msw";

export const handlers = [
  // Handles a POST /login request
  rest.get("/campaign/:name", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        campaign_name: "InstaCash",
        min_quota: 1,
        max_quota: 48,
        max_amount: 19600,
        min_amount: 1500,
        tea: 26.5612,
        payment_date: "2019-12-26T16:30:04.591Z",
        currency: "PEN",
      })
    );
  }),
  rest.post("/calculate-cuota", (req, res, ctx) => {
    const body = (req as any).body ?? {};
    const quota = body?.cuota ?? 0;
    const amount = body?.amount ?? 0;
    const result = amount / quota;
    return res(
      ctx.status(200),
      ctx.json({
        monthly_amount: result ? result : 0,
      })
    );
  }),
];
