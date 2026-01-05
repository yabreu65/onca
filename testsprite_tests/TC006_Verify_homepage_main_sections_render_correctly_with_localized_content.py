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
        # -> Navigate to homepage in next supported locale to repeat verification process
        frame = context.pages[-1]
        # Click 'Inicio' to reload or reset homepage for next locale navigation
        elem = frame.locator('xpath=html/body/header/div[2]/div/nav/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Navigate to homepage in next supported locale to verify hero, services preview, testimonials, partners, and contact CTA sections
        await page.goto('http://localhost:3001/en', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Navigate to homepage in next supported locale to repeat verification process
        await page.goto('http://localhost:3001/fr', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Check if other supported locales exist and verify their homepage sections or report French locale issue.
        await page.goto('http://localhost:3001/de', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Check if other supported locales exist and verify their homepage sections or report French and German locale issues.
        await page.goto('http://localhost:3001', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=OPTIMIZE,').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=SIMPLIFY').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=AND LEAD').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=WITH OUR SOLUTIONS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Customer Visits').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Web Orders').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Preparation').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mobile Delivery').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Reception').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Collections').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Authorization').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=The web portal developed by ONCA IT meant a substantial improvement in order income and in the comprehensive service we provide to our clients').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ONCA IT developed our mobile app for client management providing innovation and support. We integrated with our ERP, improving processes and fostering continuous evolution.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=In this ever-changing world, we must understand that both AI and process automation are the only tools that will help companies be competitive. Together with ONCA IT, our technology advisor, we are on that path.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ONCA Mobile was fundamental in our logistics reengineering. It allowed us to optimize efficiency, significantly reduce errors and increase customer satisfaction.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=We automated order preparation and packaging, minimizing errors, which positively impacted customer satisfaction, our efficiency and stock reliability.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=They connect human talent in software development with the most challenging technology projects.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Acudir').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Allub Hnos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Chisap').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Celulosa Campana').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Daedaz').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ElectroOutlet').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Fresh').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Gleba').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=GTC').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mateo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mercomax').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Motorarg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Schaeffler').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Oligra').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pingakol').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Talleres Banfield').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=VIA').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Need to talk to us?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=We\'re available to help you via WhatsApp. Click the button and we\'ll respond in minutes.').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    