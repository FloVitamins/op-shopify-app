# OP Shopify App

A Shopify app with multiple extensions for enhanced customer experience. Currently includes SMS marketing consent collection with plans for additional checkout UI extensions, payment functions, and other Shopify extensions.

## 🏗️ Project Structure

This project is structured as a **monorepo** containing multiple Shopify extensions:

- **SMS Checkout Extension** (`extensions/checkout-sms/`): Collects customer phone numbers and marketing consent during checkout
- **Future Extensions**: Additional extensions will be added as separate modules, including:
  - Checkout UI extensions (custom checkout components)
  - Payment functions (custom payment processing logic)
  - Admin UI extensions (custom admin interface components)
  - Theme app extensions (theme customization)
  - And other Shopify extension types

Each extension lives in its own folder under `extensions/` and can be developed independently.

### Adding New Extensions

Teammates can easily add new extensions using the Shopify CLI:

```bash
# From the project root
shopify app generate extension
```

This will prompt you to choose the extension type and create a new extension folder under `extensions/` with the proper structure and configuration.

**Supported Extension Types:**
- **Checkout UI Extensions**: Custom checkout components and forms
- **Payment Functions**: Custom payment processing logic
- **Admin UI Extensions**: Custom admin interface components
- **Theme App Extensions**: Theme customization and blocks
- **Web Pixel Extensions**: Analytics and tracking
- **And more**: The CLI supports all current Shopify extension types

## 🚀 Current Features

### SMS Checkout Extension
- **SMS Marketing Consent Collection**: Collects customer phone numbers and marketing consent during checkout
- **Phone Number Validation**: Validates and formats phone numbers using libphonenumber-js
- **Conditional Rendering**: Only shows the SMS collection form when a specific test attribute is present
- **Cart Attributes**: Stores phone number and consent data as cart attributes for order processing

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Node.js**: Version 18.20+ or 20.10+ or 21.0.0+
2. **Shopify Partner Account**: [Create one here](https://partners.shopify.com/signup)
3. **Test Store**: Set up a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store)
4. **Shopify CLI**: Install the [Shopify CLI](https://shopify.dev/docs/apps/tools/cli/installation)

## 🛠️ Setup Instructions

### 1. Fork the Repository

1. **Fork this repository** on GitHub by clicking the "Fork" button
2. **Clone your fork** to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/op-shopify-app.git
cd op-shopify-app
```

3. **Add upstream remote** to stay updated with the main repository:

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/op-shopify-app.git
```

### 2. Install Dependencies

```bash
# Install main app dependencies
npm install

# Install extension dependencies
cd extensions/checkout-sms
npm install
cd ../..
```

### 3. Setup Shopify Configuration

The `shopify.app.toml` file is gitignored because it contains local tunnel URLs. Copy the template:

```bash
cp shopify.app.toml.template shopify.app.toml
```

The Shopify CLI will automatically update the URLs when you run `npm run dev`.

## 🚀 Development

### Start the Development Server

```bash
# From the project root
npm run dev
```

This will:
- Start the Remix development server
- Build and serve the checkout extension
- Create a tunnel for local development
- Open your app in the browser

## 📁 Project Structure

```
op-shopify-app/
├── app/                          # Remix app (main backend)
│   ├── routes/                   # App routes
│   ├── shopify.server.ts         # Shopify app configuration
│   └── db.server.ts             # Database configuration
├── extensions/                   # Shopify extensions (monorepo)
│   ├── checkout-sms/            # SMS marketing consent extension
│   │   ├── src/
│   │   │   └── Checkout.tsx     # Main extension component
│   │   ├── locales/             # Translation files
│   │   └── shopify.extension.toml
│   ├── [payment-functions]/     # Payment processing extensions
│   ├── [admin-ui-extensions]/   # Admin interface extensions
│   ├── [theme-extensions]/      # Theme customization extensions
│   └── [other-extensions]/      # Additional extension types
├── prisma/                      # Database schema and migrations
└── public/                      # Static assets
```

### Extension Development

Each extension in the `extensions/` folder is a self-contained module with:
- **Source code** in `src/` directory
- **Configuration** in `shopify.extension.toml` (or appropriate config file)
- **Translations** in `locales/` directory (if applicable)
- **Build output** in `dist/` directory (gitignored)
- **Type-specific files** depending on extension type (e.g., `functions/` for payment functions)

## 🚀 Deployment

### Build for Production

```bash
# From the project root
npm run build
```

### Deploy to Shopify

```bash
# From the project root
npm run deploy
```


## 📚 Resources

- [Shopify Checkout UI Extensions](https://shopify.dev/docs/api/checkout-ui-extensions)
- [Shopify App Development](https://shopify.dev/docs/apps/getting-started)
- [Remix Framework](https://remix.run/docs)
- [Prisma Database Toolkit](https://www.prisma.io/docs)

## 🤝 Contributing

### Workflow for Team Members

1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make your changes**:
   - For new extensions: Use `shopify app generate extension` from the root and choose the extension type
   - For existing extensions: Work within the appropriate `extensions/` folder
   - For payment functions: Use `shopify app generate extension` and select "Payment function"
   - For admin UI extensions: Use `shopify app generate extension` and select "Admin UI extension"
3. **Test thoroughly**:
   - Test your extension in a development store
   - Verify all functionality works as expected
4. **Commit your changes**: `git commit -m 'Add some feature'`
5. **Push to your fork**: `git push origin feature/your-feature-name`
6. **Submit a pull request** to the main repository

### Adding New Extensions

When adding a new extension:

1. Run `shopify app generate extension` from the project root
2. Choose the extension type (checkout UI, payment function, admin UI, theme extension, etc.)
3. Follow the prompts to configure your extension
4. The new extension will be created in `extensions/your-extension-name/`
5. Develop your extension following the same patterns as existing ones
6. Test thoroughly before submitting a PR

**Extension Type Examples:**
- **Checkout UI**: `shopify app generate extension` → "Checkout UI extension"
- **Payment Function**: `shopify app generate extension` → "Payment function"
- **Admin UI**: `shopify app generate extension` → "Admin UI extension"
- **Theme Extension**: `shopify app generate extension` → "Theme app extension"
