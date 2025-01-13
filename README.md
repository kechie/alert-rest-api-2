# ALERT ReST API 2.0

## ALERT ReST API 2.0 is a Node.js and Express-based application that provides a backend for managing alerts with user authentication, email verification, and API key-based access.

### Features
#### User Authentication:
- JWT-based login and role-based access control (RBAC).
- Email and mobile number validation.
- Email verification during user registration.

#### Alerts Management:
- CRUD operations for alerts with ownership checks.
- API Key Management:
- Generate, revoke, and list API keys dynamically.
- Write-only API endpoint secured by an API key.

#### Rate Limiting:
- Global rate limiting to prevent abuse.
- Write endpoint rate-limited to 1 request per minute per IP.

#### Audit Logging:
- Tracks user actions (create, update, delete alerts).
- Logs rate-limiting violations.
- Email Notifications:
- Verification emails for newly registered users.

### Installation

#### Prerequisites
- Node.js: v14+ (recommended).
- MongoDB: Running instance of MongoDB.
- Yarn: Install Yarn if not already available.

### Clone the Repository
```bash
 git clone https://www.github.com/Laoag-City/alert-api-2.git
cd alert-api-2
```

### Install Dependencies
```bash
yarn install
```

### Environment Variables
Create a .env file in the root directory with the following variables:
```env
# Server Config
PORT=3000
NODE_ENV=development
# MongoDB Config
MONGO_URI=mongodb://localhost:27017/alerts_db

# JWT Secret
JWT_SECRET=your_jwt_secret

# Email Config
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### Run the Application
#### Development Mode:
```bash
yarn dev
```

#### Production Mode:
```bash
yarn production
```

### API Endpoints

#### User Authentication
|Endpoint              |	Method |	Description                                    |
|----------------------|---------|-------------------------------------------------|
|/api/auth/register    |	POST   |Registers a new user. Sends a verification email.|
|/api/auth/login       |	POST   |Logs in a user and provides a JWT.               |
|/api/auth/verify-email|  GET    |Verifies the user's email using a token.         |

#### Alerts Management
|Endpoint              |	Method |	Description         |	Access                                            |
|----------------------|---------|----------------------|---------------------------------------------------|
|/api/alerts           | POST 	 | Creates a new alert.	| Authenticated Users                               |
|/api/alerts           | GET	   | Fetches all alerts   | (admin) or user-owned alerts.	Authenticated Users |
|/api/alerts/:id	     | PUT	   | Updates an alert     | (ownership required).	Authenticated Users         |
|/api/alerts/:id	     | DELETE  | Deletes an alert     | (ownership required).	Authenticated Users         |

#### API Key Management
|Endpoint              |	Method |	Description                                    |	Access
|----------------------|---------|-------------------------------------------------|------------------------|
|/api/keys/generate	   | POST    | Generates a new API key.	                       | Admin Only             |
|/api/keys/list	       | GET     | Lists all API keys.	                           | Admin Only             |
|/api/keys/revoke	     | POST	   | Revokes an API key.	                           | Admin Only             |
|/api/write	           | POST	   | Write-only endpoint using an API key.	API Key  | Public                 |

#### Rate-Limiting Logs
|Endpoint              |	Method |	Description                                    |	Access
|----------------------|---------|-------------------------------------------------|------------------------|
|/api/rate-limit-logs	 | GET	   | Fetches rate-limiting violation logs.	         | Admin Only             |s

### Database Models

#### User Model
|Field                 | Type         |	Description                                | 
|----------------------|--------------|--------------------------------------------|
| username             |	String      | Unique username for the user.              |
| password             |	String      | Hashed password for security.              |
| role                 |	Enum	      | Role of the user (user or admin).          |
| mobilenum            |	String	    | User's mobile number.                      | 
| email                | String	      | User's email address (unique).             |
| verified	           | Boolean	    | Whether the user's email is verified.      |
| verificationToken	   | String	      | Token for email verification.              |

#### Alert Model
|Field                 | Type         |	Description                                | 
|----------------------|--------------|--------------------------------------------|
| alertservice         | String	      | Name of the alert service.                 |
| mobilenumber         | String	      | Mobile number associated with the alert.   |
| latitude	           | Number	      | Latitude of the alert location.            |
| longitude	           | Number	      | Longitude of the alert location.           |
| notified             | Boolean	    | Whether the alert was notified.            |
| responded            | Boolean	    | Whether the alert has been responded to.   |
| isPrank              | Boolean	    | Whether the alert is a prank.              |
| createdBy            | ObjectId	    | User who created the alert.                |

#### Audit Model
|Field                 | Type         |	Description                                | 
|----------------------|--------------|--------------------------------------------|
| action	             | String	      | Action performed (CREATE, UPDATE, DELETE). |
| alertId              | ObjectId	    | ID of the alert associated with the action.|
| performedBy          | ObjectId	    | User who performed the action.             |
| timestamp            | Date         | When the action was performed.             |
| changes              | Object	      | Details of the changes (for updates).      |

#### Rate-Limit Log Model
|Field                 | Type         |	Description                                | 
|----------------------|--------------|--------------------------------------------|
| ip	                 | String       |	IP address of the violator.                |
| endpoint             | String	      | Endpoint being accessed.                   |
| timestamp	           | Date	        | When the violation occurred.               |

### Testing
#### Run the Development Server:
```bash
yarn dev
```

### API Testing:
Use Postman, Insomnia, or cURL to test the API endpoints.
Ensure proper JWT tokens or API keys are used for authentication.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request on the GitHub repository.

### License
This project is licensed under the MIT License. See the LICENSE file for details.