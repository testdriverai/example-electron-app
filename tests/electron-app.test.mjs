/**
 * Installs draw.io (an open-source Electron diagram editor) on Linux, adds a
 * rectangle to a blank diagram, labels it, and checks the result on the canvas.
 */
import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

const DRAWIO_DEB =
  "https://github.com/jgraph/drawio-desktop/releases/download/v32.5.5/drawio-amd64-32.5.5.deb";

describe("draw.io (Electron)", () => {
  it("adds a labeled rectangle to a new diagram", async (context) => {
    const testdriver = TestDriver(context);

    // Download and install the .deb. We start the app ourselves below.
    await testdriver.provision.installer({ url: DRAWIO_DEB, launch: false });

    // Pull in any missing runtime dependencies, then start draw.io.
    await testdriver.exec(
      "sh",
      "sudo apt-get update -qq && sudo DEBIAN_FRONTEND=noninteractive apt-get install -f -y -qq",
      240000,
    );
    await testdriver.exec("sh", "nohup drawio >/tmp/drawio.log 2>&1 &", 10000);

    // draw.io opens straight into a blank diagram. Wait for the window to appear.
    await testdriver.find('"Untitled Diagram" title at the top left of the draw.io window', {
      timeout: 60000,
    });

    // Add a rectangle from the shape panel. It lands in the middle of the canvas.
    await testdriver.find("plain rectangle shape, the first shape in the General section of the left shape panel").click();

    // Double-click the rectangle to edit its label, type, then click away to commit.
    await testdriver.find("the selected white rectangle in the middle of the canvas").doubleClick();
    await testdriver.type("Checkout Service");
    await testdriver.find("empty white grid area of the canvas below the rectangle").click();

    // Wait for the labeled shape, then check what the app rendered.
    await testdriver.find('rectangle on the canvas labeled "Checkout Service"', { timeout: 15000 });
    const labeled = await testdriver.assert(
      'the draw.io canvas shows a rectangle with the label "Checkout Service" and the label is not in edit mode',
    );
    expect(labeled).toBeTruthy();
  });
});
