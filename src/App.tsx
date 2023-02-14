import React from 'react';
import ReactModal from 'react-modal';
import './App.css';
import {UserContext} from "./contexts/user.context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "./components/navbar/navbar";
import {HomePage} from './pages/home/home.page';
import {UserService} from "./services/user.service";
import {User} from "./domain/user";
import {ScrollToTop} from "./components/scroll-to-top/scroll-to-top";
import {SponsorsPage} from "./pages/sponsors/sponsors.page";
import {InformationPage} from "./pages/information/information.page";
import {GoingFurtherPage} from "./pages/going-further/going-further.page";
import RegistrationPage from "./pages/registration/registration.page";
import LoginPage from "./pages/login/login.page";
import {LogoutPage} from "./pages/logout/logout.page";
import {AskPasswordResetPage} from "./pages/ask-password-reset/ask-password-reset.page";
import PasswordResetPage from "./pages/password-reset/password-reset.page";
import {AuthenticatedRoutes} from "./components/authenticated-routes/authenticated-routes";
import {TeamPage} from "./pages/team/team.page";
import {AdminPage} from "./pages/admin/admin.page";
import {NotFoundPage} from "./pages/not-found/not-found.page";

ReactModal.setAppElement('#root');

const docTitle = "CSLabs Hackathon : Le Handicap";
document.addEventListener("blur", () => {
  document.title = "Come back you found an easter egg";
});

document.addEventListener("focus", () => {
  document.title = docTitle;
});

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    UserService.getUserSubject().subscribe((user: User | null) => {
      this.setState({user: user});
    });
    UserService.tryAutoLogin()
      .then((user) => {
        if (user) {
          console.log('Auto login worked.');
        }
      })
      .catch(() => {
        UserService.getUserSubject().next(null);
      });
  }

  render() {
    return (
      <UserContext.Provider value={{user: this.state.user}}>
        <BrowserRouter>
          <ScrollToTop/>
          <Navbar/>
          <Routes>
            <Route path="/sponsors" element={<SponsorsPage/>} />
            <Route path="/infos" element={<InformationPage/>} />
            <Route path="/plus-loin" element={<GoingFurtherPage/>} />
            <Route path="/inscription" element={<RegistrationPage/>} />
            <Route path="/connexion" element={<LoginPage/>} />
            <Route path="/deconnexion" element={<LogoutPage/>} />
            <Route path="/ask-password-reset" element={<AskPasswordResetPage/>} />
            <Route path="/password-reset/:token" element={<PasswordResetPage/>} />
            <Route element={<AuthenticatedRoutes admin={false}/>}>
              <Route path="/team/*" element={<TeamPage />}/>
            </Route>
            <Route element={<AuthenticatedRoutes admin={true}/>}>
              <Route path="/admin/*" element={<AdminPage />}/>
            </Route>
            {/*<AuthenticatedRoute admin={false} path={'/team/*'} element={<TeamPage/>}/>*/}
            {/*<AuthenticatedRoute admin={true} path={'/admin/*'} element={<AdminPage/>}/>*/}
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>

            {/*<Route>*/}
            {/*  <Navigate to="/not-found" replace={true}/>*/}
            {/*</Route>*/}

            {/*<Route exact path="/sponsors" component={SponsorsPage}/>*/}
            {/*<Route exact path="/infos" component={InformationPage}/>*/}
            {/*<Route exact path="/plus-loin" component={GoingFurtherPage}/>*/}
            {/*<Route exact path="/inscription" component={RegistrationPage}/>*/}
            {/*<Route exact path="/connexion" component={LoginPage}/>*/}
            {/*<Route exact path="/deconnexion" component={LogoutPage}/>*/}
            {/*<Route exact path="/ask-password-reset" component={AskPasswordResetPage}/>*/}
            {/*<Route exact path="/password-reset/:token" component={PasswordResetPage}/>*/}
            {/*<AuthenticatedRoute path="/team" component={TeamPage}/>*/}
            {/*<AuthenticatedRoute path="/admin" component={AdminPage} admin={true}/>*/}
            {/*<Route exact path="/" component={HomePage}/>*/}
            {/*<Route exact path="/not-found" component={NotFoundPage}/>*/}
            {/*<Route>*/}
            {/*  <Redirect to={"/not-found"}/>*/}
            {/*</Route>*/}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
