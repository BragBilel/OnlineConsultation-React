# OnlineConsultation-React
Online consultation is the application that we intent to prepare with the help of Twilio as our third-party integration for providing us with the necessary communication channels.
There are two entry points for a consultation:
1.	Beauty Advisor (commonly referred as BA) – will be able to move ahead to joining the Twilio room after providing the necessary media access.

2.	Client – will have to verify the email and will then connect to Twilio room without audio and video and will be allowed to wait in the waiting room until the BA accepts him/her into the consultation. 

In the development so far, we have used JSP to create the landing page for both BA and Client and React to create the waiting room and device selection page.
We are loading Twilio’s sdk https://sdk.twilio.com/js/video/releases/2.14.0/twilio-video.min page load.
Generating Access Token (using the account SID, API key SID and API secret key) and Room Id is handled at the backend using Java.
Also, we have used Video.createLocalTracks() to fetch the details of the local tracks to display on the Media Container in the device selection page where they will be able to see the video preview before entering the consultation. 
We have used the useDevice hook to get the details of the available Audio and Video input devices to display in the dropdown.
In the coming development we will be addressing the following key features:
	Client: On successfully verifying email address connecting client to Twilio room w/o audio and video access 
	BA: Connecting to the room after granting necessary media access.
	Notifying the BA with a pop up if and when the client connects to the waiting room. 
	Dynamically updating the waiting room by providing  a Start button if the BA accepts the pop up.


