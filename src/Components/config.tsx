import { Platform } from "react-native";

//	apiurl: 'http://d656abe1f940.ngrok.io/',



 const klapzconfig = {
	apiurl: 'https://klapz.club/',
	onetapLoginUrl: "https://api.sandbox.bureau.id/v2/auth/",
	onetapClientId: "15eefbaa-859c-4f3d-abcc-455062f14b93",
	androidClientId: '267663614445-j4ctmdqp9a8a9r9jqb0l6bfk0arrr0ar.apps.googleusercontent.com',
	androidClientIdRelease: "267663614445-muquinj6ci97tneol96vap3a3o73b737.apps.googleusercontent.com",
	webClientId: "267663614445-o14idoqn35atp5lbbjfi3vl794c2fmg2.apps.googleusercontent.com",
	iosClientId: '267663614445-itkbv7hdp1ob0a32f2sli1msk2bgpdov.apps.googleusercontent.com',
	twitterConsumerKey: "PjzICaYsztCopUazkTct9eyQX",
	twitterConsumerSecerate: "MUhIPrQVYuvQlN7cDFui1vCkUagATp66tJScxgdnISAFYm3vyV",
	buildNumber: Platform.OS == "ios"?2:6,
	apiFrom: Platform.OS == "ios" ? "ios":"android",
	bundel:"market://details?id=com.klapz.customer",
	//development
	payuKey: "NIQZtU",
	//production
	// payuKey:"cv12YO"
};

export default klapzconfig;
