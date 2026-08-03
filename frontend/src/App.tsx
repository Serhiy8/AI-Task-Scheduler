import { Route, Routes } from "react-router-dom";
import { Register } from "./page/register";
import { Bounce, ToastContainer } from "react-toastify";
import { Login } from "./page/login";
import { PrivateRoute } from "./routes/privateRoute";
import { PublicRoute } from "./routes/pablicRoute";
import { Header } from "./components/headerTemplate";
import { NotFound } from "./page/notFound";
import { Dashboard } from "./page/tasks";
import { useEffect } from "react";
import { currentUser } from "./redux/slice/operations/authOperations";
import { useAppDispatch } from "./hooks/hooks";
import { AiCreator } from "./page/aiCreator";
import AddTaskBtn from "./components/tasks/addTaskBtn";
import { Card } from "./page/Card";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Header />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <>
                <AddTaskBtn />
                <AiCreator />
              </>
            }
          />
          <Route
            path="/tasks"
            element={
              <>
                <AddTaskBtn />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <>
                <Card />                
              </>
            }
          />
        </Route>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div></div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
