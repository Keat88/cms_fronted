import FeedbackModal from '../../assets/js/feedback-modal.js';
export const LogOut = async () => {
   FeedbackModal.loading("logout...", { title: "Please wait" });
      await new Promise(resolve => setTimeout(resolve, 5000));
        FeedbackModal.success("LogOut successfully !", "Lulu", {
          duration: 1500,
          onClose: () => {
            window.location.href = "../auth/login.html";
          }
        });
}