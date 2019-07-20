import React from 'react';
import "antd/dist/antd.css"
import { Icon, Button, Input, Modal, message, Dropdown, Menu } from 'antd';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            attemp: "0",
            name: "",
            username: '',
            password: '',
            toDo: "登录",
            posted: false
        }
        this.ToLogin = this.ToLogin.bind(this);
        this.close = this.close.bind(this);
        this.signin = this.signin.bind(this);
        this.ToSignin = this.ToSignin.bind(this);
    }
    ToLogin() {
        this.setState({ posted: true })
        let that = this;
        let username = this.state.username;
        let password = this.state.password;
        let identity = this.state.attemp;


        console.log("login");
        message.success("登录成功！");

        //暂时的登陆函数
        that.props.setState({
            isWelcome: false,
            isLogin: true,
            isStudent: true,
            isAllDone: false,
            isAdmin: false,
            isTeacher: false,
            host: "",
            userInfo:
            {
                name: '菜鸡',
                username: "",
                token: '',
                access: -1,
                score: -1
            },
            answer: []
        })



        fetch('http://' + that.props.state.host + '/api/ui/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
                Username: username,
                Password: password,
                Identity: identity
            })
        }).then(
            async res => {
                if (res.status == 404) {
                    message.error("学号不存在");
                }
                else if (res.status == 204) {
                    message.error("用户名或密码错误");
                }
                else {
                    //学生登陆成功
                    let data = await res.json();
                    this.setState({ posted: false })
                    console.log("login");
                    message.success("登录成功！");
                    if (identity == "0") {
                        if (data.Score == -1) {
                            that.props.setState({
                                isWelcome: false,
                                isStudent: true,
                                isAllDone: false,
                                isLogin: true,
                                username: this.state.username,
                                userInfo: {
                                    name: data.Name,
                                    score: data.Score,
                                    access: 0
                                }
                            });
                        }
                        else {
                            that.props.setState({
                                isWelcome: false,
                                isStudent: true,
                                isAllDone: true,
                                isLogin: true,
                                username: this.state.username,
                                userInfo: {
                                    name: data.Name,
                                    score: data.Score,
                                    access: 0
                                }
                            })
                        }
                    }
                    else if (identity == "2") {
                        that.props.setState({
                            isWelcome: false,
                            isTeacher: true,
                            userInfo: {
                                access: 2
                            }
                        })
                    }
                    else if (identity == "1") {
                        that.props.setState({
                            isWelcome: false,
                            isAdmin: true,
                            userInfo: {
                                access: 1
                            }
                        })
                    }
                }
            })


    }
    ToSignin() {
        //暂时的注册函数
        this.props.setState({ isWelcome: false, isStudent: true, isLogin: true });
    }
    close() {
        this.setState({ visible: false });
        this.props.close();
    }
    signin() {
        this.setState({ toDo: "注册" });
    }
    render() {
        let login = <div id='modal'>
            <Modal
                title={
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key="1" onClick={() => this.setState({ attemp: "0" })}>学生</Menu.Item>
                            <Menu.Item key="2" onClick={() => this.setState({ attemp: "2" })}>辅导员</Menu.Item>
                            <Menu.Item key="3" onClick={() => this.setState({ attemp: "1" })}>管理员</Menu.Item>
                        </Menu >}>
                        <Button type="defult">
                            <Icon type="down" />
                            {this.state.attemp == 0 && "学生"}
                            {this.state.attemp == 2 && "辅导员"}
                            {this.state.attemp == 1 && "管理员"}
                        </Button>
                    </Dropdown>}
                visible={this.state.visible}
                onOk={this.StudentToLogin}
                onCancel={this.close}
                footer={[
                    <Button key="返回" type="defult" onClick={this.close}>
                        返回
              </Button>,
                    <Button key="登录" type="primary" onClick={this.ToLogin} loading={this.state.posted}>
                        <Icon type="check-circle" theme="twoTone" />
                        登录
              </Button>
                ]}
                visible={this.state.visible}>
                <Input id="username" addonBefore=" 账户 " placeholder={this.state.attemp=="0"?"八位学号":"管理员账户"} allowClear onChange={(x, v) => { this.setState({ username: v }) }}></Input>
                <p></p>
                <Input.Password id="password" addonBefore=" 密码 " placeholder={this.state.attemp=="0"?"一卡通号码":"管理员密码"} allowClear onChange={(x, v) => { this.setState({ password: v }) }} />
                <p > <br></br>{this.state.attemp=="0"?
                    <a onClick={()=>{this.setState({attemp:"1",toDo:"注册"})}}>
                        &nbsp;&nbsp;没有账号?
                    </a>:<div/>}
                </p>

            </Modal>
        </div>

        let sign = <div id='modal'>
            <Modal
                title="注册需管理员登录"
                visible={this.state.visible}
                onOk={this.StudentToLogin}
                onCancel={this.close}
                footer={[
                    <Button key="返回" type="defult" onClick={this.close}>
                        返回
              </Button>,
                    <Button key="注册" type="primary" onClick={this.ToLogin}>
                        登录
              </Button>
                ]}
                visible={this.state.visible}
            >
                <Input id="username" addonBefore=" 账户 " placeholder="管理员账户" allowClear onChange={(x, v) => { this.setState({ username: v }) }}></Input>
                <p></p>
                <Input.Password id="password" addonBefore=" 密码 " placeholder="管理员密码" allowClear onChange={(x, v) => { this.setState({ password: v }) }} />
                <p> </p><br></br>
            </Modal>
        </div>
        return (
            <React.Fragment>
                {this.state.toDo == "登录" ? login : sign}
            </React.Fragment>
        )
    }
}

export default LoginModal;