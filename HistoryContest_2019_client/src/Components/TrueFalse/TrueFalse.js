import React from 'react';
import { Row, Radio, Button, Col, Icon,Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import "./TrueFalse.css"
import QueueAnim from 'rc-queue-anim';
import bg1 from '../../img/background1.jpg';
import bg2 from '../../img/background2.jpg';
import bg3 from '../../img/background3.jpg';
import bg4 from '../../img/background4.jpg';
import bg5 from '../../img/background5.jpg';
import bg6 from '../../img/background6.jpg';
import bg7 from '../../img/background7.jpg';
import bg8 from '../../img/background8.jpg';
import bg9 from '../../img/background9.jpg';
import bg11 from '../../img/background11.jpg';

const RadioGroup = Radio.Group;
let imgs = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg11];
//let bg = ['rgba(202,122,44,0.7)', 'rgba(159,53,58,0.7)', 'rgba(98,89,44,0.7)', 'rgba(102, 153, 161,0.7)', 'rgba(135,102,51,0.7)', 'rgba(135,102,51,0.7)', 'rgba(46,169,223, 0.7)', 'rgba(115,67,56,0.7)', 'rgba(98,89,44,0.7)', 'rgba(215,185,142,0.7)', 'rgba(46,169,223,0.7)']
let bg = ['rgba(202,122,44,0.7)', 'rgba(159,53,58,0.7)', 'rgba(59, 54, 25, 0.7)', 'rgba(98,89,44,0.7)', 'rgba(135,102,51,0.7)', 'rgba(135,102,51,0.7)', 'rgba(14, 90, 122, 0.7)', 'rgba(115,67,56,0.7)', 'rgba(98,89,44,0.7)',  'rgba(22, 80, 105, 0.7)']
class Choice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
        this.onchange = this.onchange.bind(this);
    }
    async onchange(e) {
        this.setState({ value: e.target.value });
        if (this.props.state.isFinish) {
            this.props.setFinish(this.props.Id, e.target.value);
        }
        else {
            this.props.setFinish(this.props.Id, e.target.value);
            this.props.Next(0);
        }
    }
    render() {
        let style = {
            display: 'block',
            height: '70px',
            width: "500px",
            lineHeight: '45px',
            //color: 'white',
            //fontSize: '25px',
            backgroundColor: "rgba(255,255,255,0)",
            fontSize: 30,
            border: "0",
            overflow: "hidden"
        }
        let border,font1;
        if(this.props.size==1080/1920){
             border= 100;
             font1=30
        }
        else{
             border=70;
             font1=25;
        }
        return (
            <React.Fragment>
                <Row style={{
                    backgroundImage: `url(${imgs[(this.props.Id % 10)]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: "100%", height: "100%",
                    overflow: "hidden"
                }}>
                     <Col span={this.props.size==1080/1920?4:2}></Col>
                    <Col span={this.props.size==1080/1920?14:18} offset={1}>
                        <div style={{
                            backgroundColor: bg[this.props.Id % 10],
                            marginTop: 60,
                            marginBottom: 60,
                            backgroundSize: "cover",
                            width: "100%",
                            height: "100%",
                        }}>
                            <div style={{ height: 650, overflow: "hidden" }}>
                                <Row>
                                    <Col span={2}>
                                        <div style={{ backgroundColor: "rgba(255,255,255,0.3)", color: "white", fontSize: "80px", width: "110px", height: "110px" }} ><p style={{ textAlign: "center" }}>{this.props.Id + 1}</p></div>
                                        <div style={{ paddingTop: "180px", marginLeft: "20px" }}>
                                            <Button onClick={this.props.Prev} size="large" ghost type="default" shape="circle-outline" icon="left"></Button>
                                        </div></Col>
                                    <Col span={this.props.Id < 29 ?20:19}>

                                        <div   style={{ marginTop: 100, marginBottom: 60, marginLeft: 50, height: 195 ,overflowX:"hidden",overflowY:"auto"}}>
                                            <QueueAnim delay={200}
                                                animConfig={[
                                                    { opacity: [1, 0], translateX: [0, 80] }
                                                ]}>
                                                <p key="title" style={{ color: 'white', fontSize: 35 }}>
                                                    &nbsp;{this.props.state.title}
                                                </p>
                                            </QueueAnim>
                                        </div>
                                        <QueueAnim delay={400}
                                            animConfig={[
                                                { opacity: [1, 0], translateX: [0, 120] }
                                            ]}>
                                            <Radio.Group key="choice" style={{ color: 'white', marginLeft: 110, marginBottom: 40, minHeight: 250 , marginTop:20}} onChange={this.onchange} value={this.props.state.value} buttonStyle={"outline"}>
                                                <Radio.Button block style={style} value={1}>
                                                    <Row>
                                                        <Col span={4}>
                                                            <Icon type="check"/>
                                                        </Col>
                                                        <Col span={20}>
                                                            <p style={{ fontSize: 30, color: "white" }}>正确</p>
                                                        </Col>
                                                    </Row>
                                                </Radio.Button>
                                                <Radio.Button style={style} value={0}>
                                                    <Row>
                                                        <Col span={4}>
                                                        <Icon type="close" />
                                                        </Col>
                                                        <Col span={20}>
                                                            <p style={{ fontSize: 30, color: "white" }}>错误</p>
                                                        </Col>
                                                    </Row>
                                                </Radio.Button>

                                            </Radio.Group>
                                        </QueueAnim>
                                    </Col>
                                    <Col span={this.props.Id < 29 ?2:3}>
                                        <div style={{ marginTop: "290px" }}>
                                            {this.props.Id < 29 ?
                                                <Button onClick={() => {
                                                    this.props.Next(1
                                                    )
                                                }}
                                                    size="large" ghost type="default" shape="circle-outline" icon="right"></Button> :
                                                    <Popconfirm placement="top" title={"确认交卷？"} onConfirm={this.props.submit} okText="完成了！" cancelText="检查一下"><Button ghost size="large"  style={{height:"70px",width:"100px"}}><div style={{fontSize:"25px"}}>提交</div></Button></Popconfirm>}
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Choice;
