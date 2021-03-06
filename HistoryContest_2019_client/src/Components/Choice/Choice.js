import React from 'react';
import { Row, Radio, Button, Col } from 'antd';
import 'antd/dist/antd.css';
import './Chioce.css'
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
import bg10 from '../../img/background10.jpg';
import bg11 from '../../img/background11.jpg';
const RadioGroup = Radio.Group;
let imgs = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9,  bg11];
//let bg = ['rgba(202,122,44,0.7)', 'rgba(159,53,58,0.7)', 'rgba(98,89,44,0.7)', 'rgba(102, 153, 161,0.7)', 'rgba(135,102,51,0.7)', 'rgba(135,102,51,0.7)', 'rgba(46,169,223, 0.7)', 'rgba(115,67,56,0.7)', 'rgba(98,89,44,0.7)', 'rgba(215,185,142,0.7)', 'rgba(46,169,223,0.7)']
let bg = ['rgba(202,122,44,0.7)', 'rgba(159,53,58,0.7)', 'rgba(59, 54, 25, 0.7)', 'rgba(98,89,44,0.7)', 'rgba(135,102,51,0.7)', 'rgba(135,102,51,0.7)', 'rgba(14, 90, 122, 0.7)', 'rgba(115,67,56,0.7)', 'rgba(98,89,44,0.7)','rgba(22, 80, 105, 0.7)']

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
        let border,font1;
        if(this.props.size==1080/1920){
             border= 100;
             font1=30
        }
        else{
             border=70;
             font1=30;
        }
        let style = {
            display: 'block',
            height: '70px',
            width: "700px",
            lineHeight: '45px',
            //color: 'white',
            //fontSize: '25px',
            backgroundColor: "rgba(255,255,255,0)",
            fontSize: 30,
            border: "0",
            overflow: "hidden"
        }
        console.log(this.props.size)
        return (
            
            <React.Fragment>
                <Row onselectstart="return flase" style={{
                    backgroundImage: `url(${imgs[(this.props.Id % 10)]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: "100%", height: "100%",
                    overflow: "hidden",
                    border: "0px"
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
                                    <Col span={2} >
                                        <div style={{ backgroundColor: "rgba(255,255,255,0.3)", color: "white", fontSize: "80px", width: "110px", height: "110px" }} ><p style={{ textAlign: "center" }}>{this.props.Id + 1}</p></div>
                                        <div style={{ paddingTop: "180px", marginLeft: "20px" }}>
                                            <Button onClick={this.props.Prev} size="large" ghost type="default" shape="circle-outline" icon="left"></Button>
                                        </div>
                                    </Col>
                                    <Col span={20}>

                                        <div classname="text" style={{ marginTop: 70, marginBottom: 60, marginLeft: 50, height: 195,overflowX:"hidden",overflowY:"auto",msScrollbarBaseColor:bg[this.props.Id % 10]}}>
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
                                            <Radio.Group key="choice" style={{ color: 'white', marginLeft: border, marginBottom: 40, minHeight: 250 }} onChange={this.onchange} value={this.props.state.value} buttonStyle={"outline"}>
                                                <Radio.Button style={style} value={this.props.state.option[0].value}>
                                                    <Row>
                                                        <Col span={4}>
                                                            <b>A</b>
                                                        </Col>
                                                        <Col span={20}>
                                                            {this.props.state.option[0].text.length<=15?<p style={{ fontSize: font1, color: "white" }}>{this.props.state.option[0].text}</p>:<p style={{ fontSize: font1-6, color: "white" }}>{this.props.state.option[0].text}</p>}
                                                        </Col>
                                                    </Row>
                                                </Radio.Button>
                                                <Radio.Button block style={style} value={this.props.state.option[1].value}>
                                                    <Row>
                                                        <Col span={4}>
                                                            <b>B</b>
                                                        </Col>
                                                        <Col span={20}>
                                                        {this.props.state.option[1].text.length<=15?<p style={{ fontSize: font1, color: "white" }}>{this.props.state.option[1].text}</p>:<p style={{ fontSize: font1-6, color: "white" }}>{this.props.state.option[1].text}</p>}
                                                        </Col>
                                                    </Row>
                                                </Radio.Button>
                                                <Radio.Button style={style} value={this.props.state.option[2].value}>
                                                    <Row>
                                                        <Col span={4}>
                                                            <b>C</b>
                                                        </Col>
                                                        <Col span={20} >
                                                        {this.props.state.option[2].text.length<=15?<p style={{ fontSize: font1, color: "white" }}>{this.props.state.option[2].text}</p>:<p style={{ fontSize: font1-6, color: "white" }}>{this.props.state.option[2].text}</p>}
                                                        </Col>
                                                    </Row>
                                                </Radio.Button>
                                                <Radio.Button style={style} value={this.props.state.option[3].value}>
                                                    <Row>
                                                        <Col span={4}>
                                                            <b>D</b>
                                                        </Col>
                                                        <Col span={20}>
                                                        {this.props.state.option[3].text.length<=15?<p style={{ fontSize: font1, color: "white" }}>{this.props.state.option[3].text}</p>:<p style={{ fontSize: font1-6, color: "white" }}>{this.props.state.option[3].text}</p>}
                                                        </Col>
                                                    </Row>
                                                </Radio.Button>
                                            </Radio.Group>
                                        </QueueAnim>
                                    </Col>
                                    <Col span={2}>
                                        <div style={{ marginTop: "290px" }}>
                                            {this.props.Id < 29 ?
                                                <Button onClick={() => {
                                                    this.props.Next(1
                                                    )
                                                }}
                                                    size="large" ghost type="default" shape="circle-outline" icon="right"></Button> :
                                                <Button type='primary' onClick={this.props.submit}>提交</Button>}
                                        </div>
                                    </Col>
                                    {/* <Row>
                                            <Col span={16}></Col>
                                            <Col span={3}>
                                                {this.props.Id > 0 && <Button onClick={this.props.Prev}>上一题</Button>}
                                            </Col>
                                            <Col span={4} style={{ marginBottom: 40 }}>
                                                {this.props.Id < 29 && <Button onClick={this.props.Next}>下一题</Button>}
                                                {this.props.Id == 29 && <Button type='primary' onClick={this.submit}>提交</Button>}
                                            </Col>

                                        </Row> */}

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