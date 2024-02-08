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
// import {DrawBoardPage} from "./pages/draw-board/draw-board.page";
// import {SpaceInvaderPage} from "./pages/space-invader/space-invader.page";
// import {PizzaClickerPage} from "./pages/pizza-clicker/pizza-clicker.page";

ReactModal.setAppElement('#root');

const docTitle = "CSLabs Hackathon : " + process.env.REACT_APP_NAME_EVENT;
document.addEventListener("blur", () => {
  document.title = "Come back...";
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
            <Route path="/partenaires" element={<SponsorsPage/>} />
            <Route path="/infos" element={<InformationPage/>} />
            <Route path="/plus-loin" element={<GoingFurtherPage/>} />
            <Route path="/inscription" element={<RegistrationPage/>} />
            <Route path="/connexion" element={<LoginPage/>} />
            <Route path="/deconnexion" element={<LogoutPage/>} />
            <Route path="/ask-password-reset" element={<AskPasswordResetPage/>} />
            <Route path="/password-reset/:token" element={<PasswordResetPage/>} />
            {/* <Route path="/draw-board" element={<DrawBoardPage/>} />
            <Route path="/space-invader" element={<SpaceInvaderPage/>} />
            <Route path="/pizza-clicker" element={<PizzaClickerPage/>} /> */}
            <Route element={<AuthenticatedRoutes admin={false}/>}>
              <Route path="/team/*" element={<TeamPage />}/>
            </Route>
            <Route element={<AuthenticatedRoutes admin={true}/>}>
              <Route path="/admin/*" element={<AdminPage />}/>
            </Route>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
