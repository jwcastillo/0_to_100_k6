import { browser } from "k6/experimental/browser";
import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
  scenarios: {
    ui: {
      exec: "checkFrontend",
      executor: "constant-vus",
      vus: 1,
      duration: "30s",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
    smoke: {
      exec: "myMessages",
      executor: "constant-vus",
      vus: 1,
      duration: "10s",
    },
    stress: {
      exec: "myMessages",
      executor: "ramping-vus",
      stages: [
        { duration: "5s", target: 5 },
        { duration: "10s", target: 5 },
        { duration: "5s", target: 0 },
      ],
      gracefulRampDown: "5s",
      startTime: "10s",
    },
  },
  thresholds: {
    checks: ["rate==1.0"],
  },
};

export async function checkFrontend() {
  const context = browser.newContext();
  const page = context.newPage();

  try {
    await page.goto("https://test.k6.io/my_messages.php");
    page.screenshot({ path: "screenshots/my_messages.png" });

    page.locator('input[name="login"]').type("admin");
    page.locator('input[name="password"]').type("123");

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);
    page.screenshot({ path: "screenshots/table.png" });

    check(page, {
      header: (p) => p.locator("h2").textContent() == "Welcome, admin!",
    });
  } finally {
    page.close();
  }
}

export function myMessages() {
  let res = http.get("https://test.k6.io/my_messages.php");
  check(res, {
    "status is 200": (res) => res.status === 200,
  });
  sleep(1);
}
