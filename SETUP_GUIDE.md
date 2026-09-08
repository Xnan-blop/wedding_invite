# Google Sheets RSVP Setup Guide

## Step 1: Create a Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "New" and create a new spreadsheet
3. Name it "Wedding RSVPs" (or whatever you prefer)

## Step 2: Set Up Google Apps Script
1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete any existing code
3. Copy and paste the code from `google-apps-script.gs`
4. Click **Save**

## Step 3: Deploy the Script
1. Click **Deploy** (top right)
2. Select **New Deployment**
3. Click the gear icon and select **Web app**
4. Set:
   - **Execute as:** Your Google account
   - **Who has access:** Anyone
5. Click **Deploy**
6. **Authorization Step (IMPORTANT):**
   - Google will show "Google hasn't verified this app" - this is normal for personal scripts
   - Click **"Advanced"** at the bottom
   - Click **"Go to [your project name] (unsafe)"**
   - Select your Google account
   - Click **"Allow"**
7. You'll see a deployment URL - copy it

## Step 4: Add Script URL to HTML
1. Open `index.html`
2. Find this line: `const scriptURL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb/doPost';`
3. Replace `YOUR_SCRIPT_ID` with your actual Script ID from the deployment URL
   - The full URL from Google will look like: `https://script.google.com/macros/s/AKfycbz...../userweb/doPost`
   - Just copy the entire URL

## Step 5: Test It
1. Open your wedding website in a browser
2. Fill out and submit the RSVP form
3. Check your Google Sheet - the response should appear!

## Troubleshooting
- **No responses showing?** Check that the Script ID is correct in the HTML
- **CORS error?** The script uses `mode: 'no-cors'` so this should work
- **Script error?** Check the Apps Script logs: Extensions > Apps Script > Execution log

That's it! All RSVP submissions will automatically go to your Google Sheet.
