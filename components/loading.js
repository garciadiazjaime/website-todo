export default function Loading() {
  return (
    <div className="container">
      <div className="loader"></div>
      <style jsx>{`
        .container {
          position: fixed;
          bottom: 12px;
          right: 42%;
        }
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 80px;
          height: 80px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
