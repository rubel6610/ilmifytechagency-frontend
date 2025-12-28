import Button from "./component/button/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="max-w-lg w-full backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center space-y-6 text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
        }}
      >
        <h1 className="text-8xl font-extrabold tracking-tight">404</h1>

        <h2 className="text-2xl font-semibold">Page not found</h2>

        <p className="opacity-90">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="flex justify-center">
          <Button address="/" label="Go Home" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
