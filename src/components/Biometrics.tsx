import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { memo } from "react";
import PropTypes from "prop-types";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from "react-native";
import { systemWeights } from "react-native-typography";

const {
	Constants: {
		colors
	}
} = require("../../ProjectData.json");

interface General {
	biometricTypeSupported: string, //FaceID or TouchID
	retryAuthentication: (boolean) => void
}
const GetIcon = ({ biometricTypeSupported = "", retryAuthentication = () => null }: General) => {
	try {
		if (biometricTypeSupported === "FaceID") {
			return (
				<TouchableOpacity activeOpacity={0.6} onPress={retryAuthentication} style={styles.container}>
					<MaterialCommunityIcons name={"face"} size={65} color={colors.white} />
					<Text style={styles.text}>
						FaceID Enabled
					</Text>
					<Text style={styles.smallText}>Retry</Text>
				</TouchableOpacity>
			);
		}
		if (biometricTypeSupported === "TouchID") {
			return (
				<TouchableOpacity activeOpacity={0.6} onPress={retryAuthentication} style={styles.container}>
					<Ionicons name={"ios-finger-print"} size={65} color={colors.white} />
					<Text style={styles.text}>
						TouchID Enabled
					</Text>
					<Text style={styles.smallText}>Retry</Text>
				</TouchableOpacity>
			);
		}
		return(
			<TouchableOpacity activeOpacity={0.6} onPress={retryAuthentication} style={styles.container}>
				<Ionicons name={"ios-finger-print"} size={65} color={colors.white} />
				<Text style={styles.text}>
					It appears that your device does not support Biometric security.
				</Text>
				<Text style={styles.smallText}>Retry</Text>
			</TouchableOpacity>
		);
	} catch (e) {
		return(
			<View style={styles.container}>
				<Ionicons name={"ios-finger-print"} size={65} color={colors.white} />
				<Text style={styles.text}>
					It appears that your device does not support Biometric security.
				</Text>
			</View>
		);
	}
};

interface BiometricsComponent extends General {
	style?: object
}
const _Biometrics = ({ style = {}, biometricTypeSupported = "", retryAuthentication = () => null }: BiometricsComponent) => {
	return (
		<View style={[styles.container, { ...style }]}>
			<GetIcon biometricTypeSupported={biometricTypeSupported} retryAuthentication={() => retryAuthentication(true)} />
		</View>
	);
};

_Biometrics.protoTypes = {
	biometricTypeSupported: PropTypes.bool.isRequired,
	retryAuthentication: PropTypes.func.isRequired,
	style: PropTypes.object
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "center"
	},
	text: {
		...systemWeights.regular,
		color: colors.white,
		fontSize: 18,
		textAlign: "center",
		marginHorizontal: 20
	},
	smallText: {
		...systemWeights.light,
		color: colors.white,
		fontSize: 16,
		textAlign: "center",
		marginHorizontal: 20,
		marginTop: 5
	}
});

//ComponentShouldNotUpdate
const Biometrics = memo(
	_Biometrics,
	() => true
);
export default Biometrics;
