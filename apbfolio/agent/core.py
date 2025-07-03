from tools.calendar_tool import CalendarTool
from tools.GoogleCalendar import GoogleCalendarTool
from tools.reminder_tool import ReminderTool
from rl.feedback import FeedbackManager
from safety.validation import validate_input

def main():
    '''
    Launches the main user-agent interaction loop.
    Interprets user intent, validates input, calls appropriate tool,
    and recordes feedback after each action.
    '''
    print("🤖 Hello, I am your AI Process Automation Assistant.")
    
    # Initialize tools and feedback manager
    calendar_tool = CalendarTool()
    reminder_tool = ReminderTool()
    feedback_manager = FeedbackManager()

    while True:
        user_input = input("\nWhat would you like help with? (type 'exit' to quit): ").strip()
        
        if user_input.lower() == 'exit':
            print("👋 Goodbye!")
            break

        # Validate input
        if not validate_input(user_input):
            print("⚠️ Invalid input. Please try again.")
            continue

        # Naive logic routing (replace with LLM/Chain-of-Thought reasoning later)
        if "schedule" in user_input.lower():
            use_google = input("Use Google Calender? (yes/no): ").strip().lower() ==  "yes"
            select_calendar_tool = GoogleCalendarTool() if use_google else calendar_tool
            title = input("📅 Event title: ")
            date = input("📆 Date (YYYY-MM-DD): ")
            time = input("⏰ Time (HH:MM 24hr format): ")
            response = calendar_tool.schedule_event(title, date, time)
            print(response)

            feedback_manager.record_action("schedule_event", response)

        elif "reminder" in user_input.lower():
            
            recipient = input("📧 Recipient email or name: ")
            message = input("📝 Message: ")
            when = input("⏰ Time to send reminder (YYYY-MM-DD HH:MM): ")
            response = reminder_tool.send_reminder(recipient, message, when)
            print(response)

            feedback_manager.record_action("send_reminder", response)

        else:
            print("🤔 Sorry, I didn’t understand that. Try asking me to 'schedule' or 'remind'.")

if __name__ == "__main__":
    main()
