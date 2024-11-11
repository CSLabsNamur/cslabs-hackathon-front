import React from "react";
import "./admin-votes.page.css";
import { Link } from "react-router-dom";
import { AdminService } from "@/services/admin.service.ts";

type VoteResult = {
  id: string,
  name: string,
  votes: number
};

export class AdminVotesPage extends React.Component<{}, {
  votes: VoteResult[],
  votes_nb: number,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      votes: [],
      votes_nb: 0,
    };
  }

  componentDidMount() {
    this.getVoteResults();
  }

  getVoteResults() {
    AdminService.getVoteResults().then((results: VoteResult[]) => {
      const votes_nb = results.map((r) => r.votes).reduce((a, b) => a + b, 0);
      this.setState({
        ...this.state,
        votes: results.sort((a, b) => b.votes - a.votes),
        votes_nb,
      });
    });
  }

  getVotePercentage(votes: number) {
    if (this.state.votes_nb < 1) {
      return 0;
    }
    return Math.ceil(100 * (votes / this.state.votes_nb));
  }

  render() {
    return (
      <div id="admin-votes-page">

        <div className="tx-centered">
          <h3>Résultats des votes</h3>
          <Link to="/admin">
            <button className="button-primary-outlined button-large">Retour</button>
          </Link>
        </div>

        <div id="admin-votes-page__results">
          {this.state.votes.map((r, i) => (
            <div className="result progress-bar" key={i}>
              <span className="votes progress-bar-blue"
                    style={{"width": this.getVotePercentage(r.votes).toString() + "%"}}/>
              <span className="name">({r.votes}) {r.name}</span>
            </div>
          ))}
        </div>

      </div>
    );
  }

}
