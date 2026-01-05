import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3001", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Request /sitemap.xml from the site to verify its content
        await page.goto('http://localhost:3001/sitemap.xml', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=This XML file does not appear to have any style information associated with it. The document tree is shown below.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/servicios').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/servicios/visitas').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/servicios/pedidos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/servicios/preparacion').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/servicios/entregas').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/servicios/recepcion').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/servicios/cobranzas').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/servicios/autorizacion').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/casos-de-exito').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/partners').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/privacidad').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/terminos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/servicios').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/servicios/visits').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/servicios/orders').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/servicios/preparation').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/servicios/delivery').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/servicios/reception').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/servicios/collections').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/servicios/authorization').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/casos-de-exito').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/partners').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/privacidad').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://oncait.com.ar/en/terminos').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    