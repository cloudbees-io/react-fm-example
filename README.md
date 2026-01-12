# Example React application for CloudBees platform feature management

Use this example application to integrate with the CloudBees platform and test feature management. After integrating, observe changes in the application UI as you update flag values in the platform.

In this example, the Rox SDK is already set up, and feature flags are implemented in the code.

---

## Get started with the React project

To get started with the `react-fm-example` project, follow these steps:

### 1. Clone the example repository

```bash
git clone git@github.com:cloudbees-io/react-fm-example.git
```

### 2. Open the project

Use your preferred IDE (for example, Visual Studio Code, WebStorm, or IntelliJ IDEA).

### 3. Locate and copy the SDK key in the CloudBees platform

1. In the CloudBees platform, go to **Feature management > Flags**.  
2. Select an application.  
3. Select the **copy** icon next to the SDK key.

> **Note:**  
> If no SDK key is available:  
> 1. In the platform, go to **Feature management > Flags**.  
> 2. Select the **installation instructions** icon.  
> 3. Follow the installation steps. The SDK key appears once an application is linked to an environment.  
> 4. Close the installation panel and copy the SDK key.

### 4. Add the SDK key to the React application

Open the following file:

```
src/feature-management/FeatureFlagsProvider.tsx
```

Replace the placeholder with your SDK key, for example:

```tsx
const sdkKey = "<YOUR-SDK-KEY>";
```

Save the file.

---

## Run the application

You can use either Yarn or NPM.

### Yarn

```bash
yarn install
yarn dev
```

### NPM

```bash
npm install
npm run dev
```

After the application starts, open the URL displayed in your terminal to view the running application.

To verify integration, return to the SDK installation panel in the CloudBees platform UI and select **Test integration**.

---

## View the imported flags

Now that your application is running:

1. In the CloudBees platform, select **Feature management**.  
2. Select your example application to view the imported feature flags.

### Feature flags in this example

| Flag name     | Type    | Description                                                     |
|---------------|---------|-----------------------------------------------------------------|
| **showMessage** | Boolean | Turns the message on or off.                                   |
| **message**     | String  | Sets the message text.                                         |
| **fontSize**    | Number  | Font size in pixels. Values: `12`, `16`, or `24`.              |
| **fontColor**   | String  | Font color. Values: `red`, `green`, or `blue`.                 |

> **Note:**  
> If no flags are displayed, verify that the environment-specific SDK key is correctly added in  
> `src/feature-management/FeatureFlagsProvider.tsx`.  
> Save the file and restart the application.

---

## Update flag values in the platform UI

1. Select **Feature management**.  
2. Select the application.  
3. Select the **vertical ellipsis** next to a flag.  
4. Select **Configure**.  
5. Select the environment associated with your SDK key.  
6. Update the flag value and save your changes.  
7. Set **Configuration status** to **On**.

The updated flag value will appear in the application shortly.

---

## Use the application with multiple SDK keys

You can run multiple SDK instances in one application, each with its own SDK key and environment. Each instance is isolated. Use this when you need to:

- Compare flags across environments without redeploying  
- Support multi-tenant routing  
- Combine server-side and client-side evaluations  

To use multiple SDK keys:

1. Retrieve the SDK keys for the environments you will use.  
2. Initialize a separate SDK instance for each key.  
3. Route requests to the appropriate instance (for example, by tenant or region).  
4. Perform register/fetch/stream setup on each instance as required by the SDK.  
5. Evaluate flags using the correct instance and a consistent user/context object.  
6. Tag logs or metrics by instance and shut down instances when not needed.

---

## Documentation reference

- JavaScript SDK installation:  
  https://docs.cloudbees.com/docs/cloudbees-platform/latest/install-sdk/javascript-sdk

- Configure feature flags:  
  https://docs.cloudbees.com/docs/cloudbees-platform/latest/feature-management/flag-configuration
