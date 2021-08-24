/**
 * Config File to set configuration of API
 */

import { Platform } from "react-native";

//	apiurl: 'http://d656abe1f940.ngrok.io/',



 const klapzconfig = {
	apiurl: 'https://dev.klapz.club/',
	buildNumber: Platform.OS == "ios"?2:6,
	apiFrom: Platform.OS == "ios" ? "ios":"android",
};

export default klapzconfig;
