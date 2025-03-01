import nurseServiceMock from "./nurseServiceMock";
import nurseService from "./nurseService";

const useMock = false;

function service() {
    if (useMock) {
        return {
            nurseService: nurseServiceMock
        }
    } else {
        return {
            nurseService
        }
    }
}

export default service;
