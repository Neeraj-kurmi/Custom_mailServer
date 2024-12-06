

const EmailList = ({ emails }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Inbox</h2>
      <ul>
        {emails.map((email, index) => (
          <li key={index} className="border-b py-2">
            <p>
              <strong>From:</strong> {email.from}
            </p>
            <p>
              <strong>Subject:</strong> {email.subject}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
