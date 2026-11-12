# Postcards from 2035

Pre-work page for the DPI Centre vision workshop. It is hosted on GitHub Pages, and responses are saved to a Google Sheet that only you can open.

## 1. Set up the Google Sheet (10 minutes)

1. Create a new Google Sheet, for example "Postcards from 2035 – responses".
2. In the sheet, open **Extensions › Apps Script**.
3. Delete the starter code, paste in everything from `apps-script/Code.gs`, and save.
4. Click **Deploy › New deployment**. Choose the type **Web app**, then set:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** and approve the permissions. Google will warn that the app isn't verified, because it's your own script: choose **Advanced › Go to project**.
6. Copy the **Web app URL**, which ends in `/exec`.

To change the facilitator password, edit `PASSWORD` in Code.gs, then use **Deploy › Manage deployments › Edit › New version**. The password stays in your Google account and never appears in the public page.

## 2. Connect the page

Open `index.html` and replace `PASTE_YOUR_WEB_APP_URL_HERE` (near the top of the script) with your web app URL.

## 3. Add the images

Put the images in the `images/` folder as PNG files, using these names:

| Postcard | Files |
|---|---|
| 1. Picture of DPI in 2035 | scene-a, scene-b, scene-c, scene-d |
| 3. Personas | steward, bridge, sage, catalyst, explorer, guardian, host, champion |
| 4. Metaphors | airport, library, guild, lighthouse, kitchen, embassy, seedbank |

For example: `images/scene-a.png`. Any image that's missing shows a placeholder (for scenes) or its emoji (for personas and metaphors). If your files are JPGs, change `IMAGE_EXT` at the top of the script to `"jpg"`.

## 4. Publish on GitHub Pages

1. Create a new repository on GitHub, for example `postcards-2035`.
2. Upload `index.html` and the `images/` folder. There's no need to upload `apps-script/` or this README.
3. Go to **Settings › Pages**, set Source to **Deploy from a branch**, then choose the branch **main** and folder **/ (root)**, and save.
4. After a minute or two the page is live at `https://<your-username>.github.io/postcards-2035/`.

## 5. Test before you share

1. Open the link on your phone, fill in a test postcard and press **Post my postcards**. A new row should appear in the sheet.
2. Tap the key icon at the top right, enter the password and check that your test response appears.
3. Delete the test row from the sheet.

## How it behaves

- Answers are saved quietly after each postcard, so partial responses still reach you, and again when the person presses **Post**. Each person's latest version replaces their earlier one.
- If posting fails, the page offers WhatsApp, email or copy instead.
- Facilitator view: the key icon. It lists every response and lets you copy them all or download a CSV.

## A note on security

The password stops casual visitors from seeing other people's answers. It is not strong protection: the repository and page are public, and responses sit in your Google Sheet, so treat them as you would any sensitive workshop notes and delete the sheet when the work is done.
