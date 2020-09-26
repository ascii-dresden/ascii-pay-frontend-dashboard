import * as React from "react";
import { Cashier } from "./cashier/Cashier";
import { AccountView } from "./account/Account";
import { ConnectionStatus, Status } from "./ConnectionStatus";

import "./App.scss";

import { MdPayment, MdGroup, MdMenu, MdPowerSettingsNew } from "react-icons/md";

enum Mode {
    Cashier,
    Account
}

export interface AppProps { }
export interface AppState {
    mode: Mode,
    connectionStatus: Status
    menuActive: boolean
}

export class App extends React.Component<AppProps, AppState> {
    static displayName = "App"

    constructor(props: AppProps) {
        super(props);
        this.state = {
            mode: Mode.Cashier,
            connectionStatus: Status.Ok,
            menuActive: false
        };

        this.onMenuToggle = this.onMenuToggle.bind(this);
        this.onCashier = this.onCashier.bind(this);
        this.onAccount = this.onAccount.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onMenuToggle() {
        this.setState({
            menuActive: !this.state.menuActive
        });
    }

    onCashier() {
        this.setState({
            mode: Mode.Cashier
        });
    }

    onAccount() {
        this.setState({
            mode: Mode.Account
        });
    }

    onLogout() {

    }

    render() {
        let main;
        if (this.state.mode == Mode.Cashier) {
            main = <Cashier />
        } else {
            main = <AccountView />
        }

        let connectionStatus;
        if (this.state.connectionStatus != Status.Ok) {
            connectionStatus = <ConnectionStatus status={this.state.connectionStatus} />
        }

        return <>
            {connectionStatus}
            <div id="sidebar" className={this.state.menuActive ? "active" : ""}>
                <div onClick={this.onMenuToggle}>
                    <MdMenu />
                    <span>Menu</span>
                </div>
                <div onClick={this.onCashier} className={this.state.mode == Mode.Cashier ? "active" : ""}>
                    <MdPayment />
                    <span>Cashier</span>
                </div>
                <div onClick={this.onAccount} className={this.state.mode == Mode.Account ? "active" : ""}>
                    <MdGroup />
                    <span>Account</span>
                </div>
                <div onClick={this.onLogout}>
                    <MdPowerSettingsNew />
                    <span>Logout</span>
                </div>
            </div>
            <div id="main">
                {main}
            </div>
        </>;
    }
}
