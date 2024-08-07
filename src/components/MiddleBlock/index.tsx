// Assuming MiddleBlockProps interface is updated to include backgroundImage
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";

interface MiddleBlockProps {
  title: string;
  content: string;
  // button: string;
  // backgroundImage?: string;  // Optional background image URL
  t: any;
  id: string;
  backgroundColor: string
}

const MiddleBlock = ({ title, content, t, id, backgroundColor}: MiddleBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <MiddleBlockSection style={{backgroundColor: backgroundColor}}>
      {/* <Slide direction="up"> */}
        <Row justify="center" align="middle" id={id}>
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <p>{t(content)}</p>
            </Col>
          </ContentWrapper>
        </Row>
      {/* </Slide> */}
    </MiddleBlockSection>
  );  
};

export default withTranslation()(MiddleBlock);