import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Fitness Timer");
});

test("start and stop timer buttons", async ({ page }) => {
  await page.goto("/");

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
  await page.goto("/");

  // Expect no active interval to be visible.
  await expect(page.getByText("Time left:")).not.toBeVisible();

  // Click the start timer button.
  await page.getByRole("button", { name: "Start Timer" }).click();

  // Expect the active interval to be visible.
  await expect(page.getByText("Time left:")).toBeVisible();
});

test("the timer continues to the second interval", async ({ page }) => {
  await page.goto("/");

  // Click the start timer button.
  await page.getByRole("button", { name: "Start Timer" }).click();

  // Wait for the first interval to finish.
  await page.waitForTimeout(3000);

  // Expect the second interval to be active.

  await expect(page.getByTestId("active-interval-name")).toHaveText(
    "Name: Another Test Interval"
  );
});

test("the timer stops when the stop button is clicked", async ({ page }) => {
  await page.goto("/");

  // Click the start timer button.
  await page.getByRole("button", { name: "Start Timer" }).click();

  // Wait for the first interval to finish.
  await page.waitForTimeout(3000);

  // Click the stop timer button.
  await page.getByRole("button", { name: "Stop" }).click();

  // Expect the start timer button to be visible.
  await expect(page.getByRole("button", { name: "Start Timer" })).toBeVisible();
});
test("the timer resets when the reset button is clicked", async ({ page }) => {
  await page.goto("/");

  // Click the start timer button.
  await page.getByRole("button", { name: "Start Timer" }).click();

  // Wait for the first interval to finish.
  await page.waitForTimeout(3000);

  // Click the reset timer button.
  await page.getByRole("button", { name: "Reset" }).click();

  // Expect the start timer button to be visible.
  await expect(page.getByRole("button", { name: "Start Timer" })).toBeVisible();
});

test("the timer skips to the next interval when the skip button is clicked", async ({
  page,
}) => {
  await page.goto("/");

  // Click the start timer button.
  await page.getByRole("button", { name: "Start Timer" }).click();

  // Do not wait for the first interval to finish.
  await page.waitForTimeout(1000);

  // Click the skip timer button.
  await page.getByRole("button", { name: "Skip" }).click();

  // Expect the second interval to be active.
  await expect(page.getByTestId("active-interval-name")).toHaveText(
    "Name: Another Test Interval"
  );
});
