import { useState, useEffect, useRef } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Hidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
  SvgContainer,
  RowContainer
} from "./styles";
import { ReactSVG } from 'react-svg';

const Header = ({ t, svgInNavbar }: any) => {
  const [isFixed, setIsFixed] = useState(false);


  const [visible, setVisibility] = useState(false);

  const navbarRef = useRef<HTMLDivElement | null>(null);

  const svgHeight = navbarRef.current?.getBoundingClientRect().height;

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  useEffect(() => {
    const handleScroll = () => {
      const introElement = document.getElementById("intro");
      const servicesPage = document.querySelector("#motto"); // TODO ASSUMED TO BE FIRST PAGE IN CONTENT BLOCK ...
      const navbar = document.querySelector("#navbar");
      const logo_icon = document.querySelector("#LOGO_ICON");

      if (introElement && !svgInNavbar && servicesPage && navbar) {
        let navbarHeight = navbar.getBoundingClientRect().height;

        const landingHeight = introElement.offsetHeight;
        const scrollPosition = window.pageYOffset;
        const parentElement = servicesPage.parentElement;

        // Check if the scroll position exceeds the height of the landing component
        if (scrollPosition > landingHeight && !isFixed) {
          // Set padding on the parent element of #services
          if (parentElement && !logo_icon) {
            const currentPaddingTop = window.getComputedStyle(parentElement).paddingTop;
            const currentPaddingTopValue = parseInt(currentPaddingTop, 10);
            parentElement.style.paddingTop = `${currentPaddingTopValue + navbarHeight}px`;
          }
          setIsFixed(true);
        } else if (logo_icon) {
          if (parentElement) {
            const currentPaddingTop = window.getComputedStyle(parentElement).paddingTop;
            const currentPaddingTopValue = parseInt(currentPaddingTop, 10);
            parentElement.style.paddingTop = `${currentPaddingTopValue - navbarHeight}px`;
          }
          setIsFixed(false);
        }
      } else {
        console.warn("Element with id 'intro' not found.");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const MenuItem = () => {
    // const navbar = document.querySelector("#navbar");

    const scrollTo = (id: string) => {
      const navbar = document.querySelector("#navbar");

      console.log(id)
      const element = document.getElementById(id) as HTMLDivElement;
      console.log(element)
      console.log(navbar)
      if (element && navbar) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbar.getBoundingClientRect().height;

        // Calculate the maximum scrollable position
        const maxScrollablePosition = document.documentElement.scrollHeight - window.innerHeight;

        // Ensure the offset position is within the scrollable range
        const finalPosition = Math.min(offsetPosition, maxScrollablePosition);

        window.scrollTo({
          top: finalPosition,
          behavior: 'smooth',
        });

        setVisibility(false); // Assuming setVisibility is defined somewhere in your component
      }
    };

    return (
      <>
        <CustomNavLinkSmall onClick={() => scrollTo('services')}>
          <Span>{t('SERVICES')}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo('process')}>
          <Span>{t('PROCESS')}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo('about')}>
          <Span>{t('ABOUT')}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall
          style={{ width: 'auto' }}
          onClick={() => scrollTo('contact')}
        >
          <Span style={{ padding: '0.5rem 1rem' }}>
            <Button>{t("LET'S TALK!")}</Button>
          </Span>
        </CustomNavLinkSmall>
      </>
    );
  };





  return (
    <HeaderSection isFixed={isFixed} id={"navbar"} className={isFixed ? "fixed" : ""} ref={navbarRef} style={{ backgroundColor: isFixed ? "transparent" : "#597B73", display: "flex", justifyContent: "center" }}>
      <div className="floater">
        <Container>
            <RowContainer /**justify="space-between" align="middle"*/>

              <NotHidden style={{ width: '40%' }}>
                <LogoContainer to="/" aria-label="homepage" /*style={{ width: '100%' }}*/>
                  <SvgIcon src="company_name.svg" width="auto" height="10%" />
                </LogoContainer>
              </NotHidden>
              <Hidden style={{ width: '40%' }}>
                <span style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }} />

              </Hidden>

              <SvgContainer /**style={{ width: svgHeight ? `${svgHeight}px` : '10%' }}*/>
                {/**svgInNavbar*/ isFixed ? (
                  <ReactSVG
                    id="LOGO_ICON"
                    src="/img/svg/LOGO_ICON.svg"
                    className="sun-svg"
                    // style={{ width: svgHeight ? `${svgHeight}px` : '10%' }}
                    style={{ width: '80px', height: "auto" }}

                  />
                ) : (
                  <div
                    style={{
                      width: svgHeight ? `${svgHeight}px` : '10%',
                      height: '100%',  // Adjust height as needed
                      backgroundColor: 'transparent' // Set to 'transparent' or the color of the navbar
                    }}
                  />
                )}

              </SvgContainer>

              <NotHidden style={{ width: '40%', zIndex: "500000" }}>
                <div style={{ /*width: "inherit",*/ display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
                  <MenuItem />

                </div>
              </NotHidden>

              <Burger onClick={showDrawer} style={{ width: '40%' }}>
                <Outline />
              </Burger>

            </RowContainer>
            <Drawer closable={false} visible={visible} onClose={onClose}>
              <Col style={{ marginBottom: "2.5rem" }}>
                <Label onClick={onClose}>
                  <Col span={12}>
                    <Menu>Menu</Menu>
                  </Col>
                  <Col span={12}>
                    <Outline />
                  </Col>
                </Label>
              </Col>
              <MenuItem />
            </Drawer>
        </Container>
      </div>

    </HeaderSection>
  );
};

export default withTranslation()(Header);
