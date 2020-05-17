// translation
const vnStrings = {
    //survey templates
    survey: {
        edit: "Chỉnh sửa",
        externalHelpLink: "Xem hướng dẫn tạo form",
        externalHelpLinkUrl:
            "https://www.youtube.com/channel/UCH2ru9okIcooNZfpIbyq4qQ?view_as=subscriber",
        dropQuestion: "Kéo thả câu hỏi vào đây",
        copy: "Sao chép",
        addToToolbox: "Thêm vào các loại câu hỏi",
        deleteQuestion: "Xóa câu hỏi",
        convertTo: "Chuyển thành",
        drag: "Kéo",
    },
    //questionTypes
    qt: {
        default: "Mặc định",
        checkbox: "Chọn nhiều",
        dropdown: "Danh sách sổ xuống",
        radiogroup: "Chọn một",
        rating: "Đánh giá",
        text: "Câu trả lời ngắn",
        comment: "Câu trả lời dài"
    },
    //Strings in Editor
    ed: {
        defaultLocale: "Mặc định ({0})",
        survey: "Form",
        edit: "Chỉnh sửa",
        newQuestionName: "câu hỏi",
        newTextItemName: "văn bản",
        testSurvey: "Chạy thử form",
        testSurveyAgain: "Chạy thử lần nữa",
        testSurveyWidth: "Kích thước form: ",
        designer: "Thiết kế form",
        undo: "Undo",
        redo: "Redo",
        undoTooltip: "Hủy thay đổi vừa thực hiện",
        redoTooltip: "Khôi phục lại thay đổi vừa thực hiện",
        options: "Tùy chọn",
        toolbox: "Các loại câu hỏi",
        "property-grid": "Thuộc tính",
        surveyResults: "Kết quả: ",
        surveyResultsTable: "dưới dạng bảng",
        surveyResultsJson: "dưới dạng JSON",
        resultsTitle: "Tiêu đề câu hỏi",
        resultsName: "Tên câu hỏi",
        resultsValue: "Câu trả lời",
        resultsDisplayValue: "Giá trị hiển thị",
        bold: "In đậm",
        italic: "In nghiêng",
        underline: "Gạch dưới",
        fpAddQuestion: "Thêm câu hỏi..."
    },
    // Property Editors
    pe: {
        edit: "Chỉnh sửa",
        move: "Di chuyển",
        delete: "Xóa",
        add: "Thêm",
        addNew: "Thêm mới",
        addItem: "Thêm một đáp án mới",
        addOther: "Câu trả lời khác",
        addSelectAll: "Chọn tất cả",
        addNone: "Không chọn gì cả",
        removeAll: "Bỏ hết",
        // survey
        showTitle: "Hiện/ẩn tiêu đề",
        simulator: "Chọn thiết bị",
        landscapeOrientation: "Xoay ngang",
        surveyTitlePlaceholder: "Nhập tiêu đề form (VD: Đánh giá buổi học 1/1)",
        surveyDescriptionPlaceholder: "Nhập mô tả cho form",
        isRequired: "Câu hỏi bắt buộc?",
        // Header  adorner
        logoPosition: "Vị trí logo",
        addLogo: "Thêm logo...",
        changeLogo: "Đổi logo...",
        logoPositions: {
            none: "Xóa logo",
            left: "Trái",
            right: "Phải",
            top: "Trên",
            bottom: "Dưới",
        },
    },
    // Test Survey
    ts: {
        selectPage: "Chọn trang cần chạy thử:",
        showInvisibleElements: "Hiển thị các phần tử bị ẩn"
    }
};
SurveyCreator.localization.locales["vn"] = vnStrings;
SurveyCreator.localization.currentLocale = "vn";

const options = {
    showJSONEditorTab: false,
    questionTypes: [
        "text",
        "comment",
        "checkbox",
        "radiogroup",
        "dropdown",
        "rating"
    ],
    pageEditMode: "single",
    showSurveyTitle: "always",
    haveCommercialLicense: true
};
// hide page title
Survey.settings.allowShowEmptyTitleInDesignMode = false;

const creator = new SurveyCreator.SurveyCreator("surveyCreatorContainer", options);
SurveyCreator.StylesManager.applyTheme("default");

creator.showPropertyGrid = "false";
// remove toolbar items except undo/redo
creator.toolbarItems.splice(2, 5);