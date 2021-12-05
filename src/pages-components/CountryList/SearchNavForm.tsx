import { FC } from "react";
import { Form, Input, Select, Row, Col } from 'antd';
import { IContinent } from "../../services/interfaces";

interface ISearchNavFormProps {
    search: {
        countryCode: string,
        currencyCode: string,
        continents: string[]
    },
    dataContinents: {
        continents: IContinent[]
    },
    handleChangeFilter: Function
}

const SearchNavForm: FC<ISearchNavFormProps> = ({ search, dataContinents, handleChangeFilter }) => (
    <Form layout="vertical">
        <Row gutter={6}>
            <Col xs={{ span: 8 }} md={{ span: 5 }}>
                <Form.Item label="Country code">
                    <Input
                        allowClear
                        size="small"
                        placeholder="Enter country code..."
                        value={search.countryCode}
                        onChange={(e) => handleChangeFilter("countryCode", e.target.value)}
                    />
                </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} md={{ span: 5 }}>
                <Form.Item label="Currency code">
                    <Input
                        allowClear
                        size="small"
                        placeholder="Enter currency code..."
                        value={search.currencyCode}
                        onChange={(e) => handleChangeFilter("currencyCode", e.target.value)}
                    />
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 14 }}>
                <Form.Item label="Continent">
                    <Select
                        allowClear
                        mode="multiple" 
                        size="small"
                        placeholder="Select continents..."
                        value={search.continents}
                        style={{ width: '100%' }}
                        onChange={(values: string[]) => handleChangeFilter("continents", values)}
                    >
                        {dataContinents?.continents?.map((continent) => (
                            <Select.Option
                                key={continent.code}
                                value={continent.code}
                                label={continent.name}
                            >
                                {continent.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);

export default SearchNavForm;