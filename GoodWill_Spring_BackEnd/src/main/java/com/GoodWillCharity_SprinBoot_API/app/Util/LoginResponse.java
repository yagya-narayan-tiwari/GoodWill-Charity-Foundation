package com.GoodWillCharity_SprinBoot_API.app.Util;

public class LoginResponse {
        private String id;
        private String userRole;
        private String msg;
        private String token;

        public LoginResponse(String id, String userRole, String msg, String token) {//String token
            this.id = id;
            this.userRole = userRole;
            this.msg = msg;
            this.token = token;
        }

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getUserRole() {
			return userRole;
		}

		public void setUserRole(String userRole) {
			this.userRole = userRole;
		}

		public String getMsg() {
			return msg;
		}

		public void setMsg(String msg) {
			this.msg = msg;
		}

		public String getToken() {
			return token;
		}

		public void setToken(String token) {
			this.token = token;
		}

        // Getters and Setters
    }