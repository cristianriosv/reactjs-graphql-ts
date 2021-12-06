import { render } from "@testing-library/react";
import Skeleton from "./Skeleton";

describe("Skeleton component...", () => {
    it("should not render children when loading is true", () => {
        const skeleton = {
            loading: true
        }
        const childrenContent = "I am the children content";
        const component = render(<Skeleton {...skeleton} ><>{childrenContent}</></Skeleton>);
    
        expect(component.container).not.toHaveTextContent(childrenContent);
    });
    
    it("should render children when loading is false", () => {
        const skeleton = {
            loading: false
        }
        const childrenContent = "I am the children content";
        const component = render(<Skeleton {...skeleton} ><>{childrenContent}</></Skeleton>);
    
        expect(component.container).toHaveTextContent(childrenContent);
    });
})