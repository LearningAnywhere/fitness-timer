import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Fitness Timer");
});

test("start and stop timer buttons", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Click the start timer button.
  await page.getByRole("button", { name: "Start Timer" }).click();

  // Expect the start timer button to not be visible.
  await expect(
    page.getByRole("button", { name: "Start Timer" })
  ).not.toBeVisible();
  // Expect the stop timer button to be visible.
  await expect(page.getByRole("button", { name: "Stop" })).toBeVisible();
});

test("starting the timer shows the active interval", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect no active interval to be visible.
  await expect(page.getByText("Time left:")).not.toBeVisible();

  // Click the start timer button.
  await page.getByRole("button", { name: "Start Timer" }).click();

  // Expect the active interval to be visible.
  await expect(page.getByText("Time left:")).toBeVisible();
});
