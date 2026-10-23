// Expected status per route. Update when a page is published (e.g. /insights, /privacy, a case study).
export const routes = {
  "/": 200,
  "/services": 200,
  "/services/mvp-development": 200,
  "/services/custom-software": 200,
  "/services/saas-development": 200,
  "/services/ai-development": 200,
  "/services/product-design": 404,
  "/work": 200,
  "/work/unknown-case-study": 404,
  "/about": 200,
  "/contact": 200,
  "/insights": 404,
  "/insights/unknown-article": 404,
  "/privacy": 404,
  "/this-page-does-not-exist": 404,
  "/opengraph-image": 200,
};
