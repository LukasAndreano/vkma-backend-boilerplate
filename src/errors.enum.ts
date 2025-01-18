const Errors = {
	ACCESS_DENIED: {
		errorCode: 0,
		message: "access denied",
	},

	NOT_FOUND: {
		errorCode: 1,
		message: "not found",
	},

	ALREADY_EXISTS: {
		errorCode: 2,
		message: "already exists",
	},

	USER_NOT_FOUND: {
		errorCode: 3,
		message: "user not found",
	},

	BAD_REQUEST: {
		errorCode: 4,
		message: "bad request",
	},

	PHOTO_NOT_FOUND: {
		errorCode: 5,
		message: "photo not found",
	},

	NOTIFICATIONS_DISABLED: {
		errorCode: 6,
		message: "notifications disabled",
	},

	ONLY_IMAGES_ARE_ALLOWED: {
		errorCode: 7,
		message: "only images are allowed",
	},
};

export default Errors;
