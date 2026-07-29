const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = windowObj.localStorage;

const publicEnv = {
	appId: process.env.NEXT_PUBLIC_BASE44_APP_ID || process.env.VITE_BASE44_APP_ID,
	functionsVersion: process.env.NEXT_PUBLIC_BASE44_FUNCTIONS_VERSION || process.env.VITE_BASE44_FUNCTIONS_VERSION,
	serverUrl: process.env.NEXT_PUBLIC_BASE44_SERVER_URL || process.env.VITE_BASE44_SERVER_URL || 'https://base44.app',
	appBaseUrl: process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL || process.env.VITE_BASE44_APP_BASE_URL,
}

const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
	if (isNode) {
		return defaultValue;
	}
	const storageKey = `base44_${toSnakeCase(paramName)}`;
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""
			}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		storage.setItem(storageKey, searchParam);
		return searchParam;
	}
	if (defaultValue) {
		storage.setItem(storageKey, defaultValue);
		return defaultValue;
	}
	const storedValue = storage.getItem(storageKey);
	if (storedValue) {
		return storedValue;
	}
	return null;
}

const getAppParams = () => {
	if (getAppParamValue("clear_access_token") === 'true') {
		storage.removeItem('base44_access_token');
		storage.removeItem('token');
	}
	const currentUrl = isNode ? undefined : window.location.href;
	return {
		appId: getAppParamValue("app_id", { defaultValue: publicEnv.appId }),
		token: getAppParamValue("access_token", { removeFromUrl: true }),
		fromUrl: getAppParamValue("from_url", { defaultValue: currentUrl }),
		functionsVersion: getAppParamValue("functions_version", { defaultValue: publicEnv.functionsVersion }),
		serverUrl: getAppParamValue("server_url", { defaultValue: publicEnv.serverUrl }),
		appBaseUrl: getAppParamValue("app_base_url", { defaultValue: publicEnv.appBaseUrl || publicEnv.serverUrl }),
	}
}


export const appParams = {
	...getAppParams()
}
