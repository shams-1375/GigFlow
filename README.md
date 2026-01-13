GigFlow – Mini Freelance Marketplace

 Live Demo: https://gigflow-frontend-iya8.onrender.com

GigFlow is a full-stack mini freelance platform where users can post gigs, freelancers can place bids, and gig owners can hire or reject bids.
The application clearly shows gig and bid status with a clean, modern UI.

 Features:
 
 Authentication

User Registration & Login

Secure authentication using JWT + HTTP-only cookies

Only logged-in users can create gigs or place bids

Gig Management:

Create a new gig (Title, Description, Budget)

View all gigs posted on the platform

My Gigs section to see only gigs created by the logged-in user

Only the gig owner can delete their gig

Gigs are never removed from UI when assigned — only status changes

Bidding System:

Any user except the gig owner can place a bid

Freelancers can see all bids of a gig

Gig owners can:

Hire one freelancer

Reject bids manually

When a freelancer is hired:

Gig status becomes Assigned

All other bids are automatically rejected

No new bids are allowed for that gig

Status Tracking (Very Clear UI)

Gig Status:

Open

Assigned

Bid Status:

Pending

Hired

Rejected

Status is shown clearly using badges and messages in the UI

Search

Search gigs by title in the Open Gigs section

Instant client-side filtering

Tech Stack:

Frontend

React (Vite)

Tailwind CSS

Axios

React Router DOM

lucide-react

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcryptjs

Cookie-based auth

Authorization Rules
