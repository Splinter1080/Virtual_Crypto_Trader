import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const CoinInfo = ({ Coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = 'USD';
    const [flag, setflag] = useState(false);
    const { CoinName } = Coin;
    const ChangeDate = async (day) => {
        setDays(day);
        console.log(days);
        // setflag(false);
    }

    const fetchHistoricData = async () => {
        //const { data } = await axios.get(HistoricalChart("bitcoin", days, currency));
        console.log(days);
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${Coin.toLowerCase()}/market_chart?vs_currency=${'USD'}&days=${days}`);
        console.log(data);
        setflag(true);
        setHistoricData(data.prices);
        console.log(data.prices);
    };

    //console.log(coin);

    useEffect(() => {
        console.log("YO");
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);



    return (
        <Container>
            {!historicData || flag == false ? (
                <div className="loader">
                    <div className="loader__inner"></div>
                </div>
            ) : (
                <>
                    <Line
                        data={{
                            labels: historicData.map((coin) => {
                                let date = new Date(coin[0]);
                                let time =
                                    date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1 ? time : date.toLocaleDateString();
                            }),

                            datasets: [
                                {
                                    data: historicData.map((coin) => coin[1]),
                                    label: `Price ( Past ${days} Days ) in USD`, //${currency}
                                    borderColor: "#EEBC1D",
                                },
                            ],
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                },
                            },
                        }}
                    />
                    <Container>
                        <Row>
                            <Col xs="auto">
                                <h5 style={{ color: "wheat" }}>Time Frame</h5>
                            </Col>
                            <Col xs="auto">
                                <Form.Select onChange={day => ChangeDate(parseInt(day.target.value))} style={{ width: "250px" }}>
                                    <option value="1" >1 Day</option>
                                    <option value="30">30 Days</option>
                                    <option value="365">365 Days</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}

        </Container>
    )
};

export default CoinInfo;
