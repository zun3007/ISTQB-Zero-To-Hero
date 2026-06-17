/*
  Supplementary mock-exam question bank (mxx-*). 40 fresh exam-realistic questions
  authored to complement mockExam.js (mx-1..mx-32) without overlapping content.
  Distribution mirrors the real CTFL v4.0 paper: ch1:8, ch2:5, ch3:5, ch4:11,
  ch5:9, ch6:2. Every `lo` is a valid objective code from the matching chapter file.
*/

export default [
  // ============================================================
  // Chapter 1: Fundamentals of Testing (8)
  // ============================================================
  {
    id: 'mxx-1', type: 'single', k: 'K2', lo: 'FL-1.2.3', topic: 'fundamentals',
    stem: 'A programmer, tired at the end of the day, types "<=" where the specification required "<". The product is later released and a customer reports that an order of exactly the limit amount is wrongly rejected. Which sequence correctly maps the terms?',
    options: [
      { id: 'a', text: 'Failure (tiredness) -> error (the wrong operator) -> defect (rejected order)' },
      { id: 'b', text: 'Error (tiredness) -> defect (the wrong operator in code) -> failure (rejected order)' },
      { id: 'c', text: 'Defect (tiredness) -> error (wrong operator) -> failure (rejected order)' },
      { id: 'd', text: 'Root cause (wrong operator) -> error (rejected order) -> failure (tiredness)' },
    ],
    correct: ['b'],
    explanation: 'Error (mistake) là hành động sai của con người (mệt mỏi gõ nhầm); defect là phần code sai "<=" trong sản phẩm; failure là biểu hiện sai khi chạy (đơn hàng bị từ chối). Các phương án khác đảo lộn vai trò error/defect/failure.',
  },
  {
    id: 'mxx-2', type: 'single', k: 'K2', lo: 'FL-1.1.2', topic: 'fundamentals',
    stem: 'A tester reports a failure. A developer then reproduces it, steps through the code, locates the faulty line and corrects it. Which statement is correct?',
    options: [
      { id: 'a', text: 'Both the reporting and the correction are part of testing' },
      { id: 'b', text: 'Reporting the failure is testing; locating and correcting the fault is debugging' },
      { id: 'c', text: 'Both activities are debugging because they involve the same defect' },
      { id: 'd', text: 'Locating the fault is testing; correcting it is debugging' },
    ],
    correct: ['b'],
    explanation: 'Testing có thể làm lộ failure; debugging là hoạt động phát triển nhằm tìm, phân tích và sửa defect gây ra failure đó. Vì vậy báo cáo failure là testing, còn định vị và sửa là debugging.',
  },
  {
    id: 'mxx-3', type: 'single', k: 'K2', lo: 'FL-1.2.1', topic: 'fundamentals',
    stem: 'A safety-critical medical device manufacturer is deciding how much to invest in testing. Which of the following BEST justifies the investment from a testing-is-necessary perspective?',
    options: [
      { id: 'a', text: 'Testing proves the device contains no defects before shipment' },
      { id: 'b', text: 'Testing can reduce the risk of failures occurring in operation, including failures that could cause harm' },
      { id: 'c', text: 'Testing removes the legal liability of the manufacturer entirely' },
      { id: 'd', text: 'Testing makes formal reviews and quality assurance unnecessary' },
    ],
    correct: ['b'],
    explanation: 'Một lý do cốt lõi kiểm thử cần thiết là giảm rủi ro failure khi vận hành, đặc biệt trong hệ an toàn-trọng yếu. Kiểm thử không chứng minh "không lỗi", không xoá trách nhiệm pháp lý, và không thay thế QA/review.',
  },
  {
    id: 'mxx-4', type: 'single', k: 'K2', lo: 'FL-1.4.3', topic: 'fundamentals',
    stem: 'Which of the following is an example of testware rather than a test basis?',
    options: [
      { id: 'a', text: 'The requirements specification used to derive tests' },
      { id: 'b', text: 'A test execution log produced while running the tests' },
      { id: 'c', text: 'The user story that defines expected behaviour' },
      { id: 'd', text: 'The architecture design document' },
    ],
    correct: ['b'],
    explanation: 'Testware là các sản phẩm tạo ra trong hoạt động test (vd test case, test data, test log/execution log). Requirement, user story, design document là test basis — nguồn để rút ra test, không phải testware.',
  },
  {
    id: 'mxx-5', type: 'multi', k: 'K2', lo: 'FL-1.3.1', topic: 'principles',
    stem: 'Which TWO of the following statements are direct consequences of the principle "Exhaustive testing is impossible"? (Choose two)',
    options: [
      { id: 'a', text: 'Testing must use risk analysis and priorities to focus effort' },
      { id: 'b', text: 'Test techniques are used to select a sensible subset of test cases' },
      { id: 'c', text: 'A passed test set proves the absence of defects' },
      { id: 'd', text: 'Defects are always evenly distributed across all modules' },
    ],
    correct: ['a', 'b'],
    explanation: 'Vì không thể test mọi tổ hợp đầu vào, ta phải tập trung effort theo rủi ro/ưu tiên và dùng kỹ thuật test để chọn tập con hợp lý. "Chứng minh không lỗi" trái với nguyên lý, còn phân bố đều defect trái với nguyên lý defects cluster.',
  },
  {
    id: 'mxx-6', type: 'single', k: 'K2', lo: 'FL-1.4.1', topic: 'fundamentals',
    stem: 'A team has finished identifying test conditions and is now creating concrete test cases with specific input values and expected results, and organising them into test procedures. Which two activities are being performed, in order?',
    options: [
      { id: 'a', text: 'Test planning, then test analysis' },
      { id: 'b', text: 'Test design, then test implementation' },
      { id: 'c', text: 'Test implementation, then test execution' },
      { id: 'd', text: 'Test analysis, then test completion' },
    ],
    correct: ['b'],
    explanation: 'Tạo test case từ test condition là test design ("how to test"); chuẩn bị test procedure, test data, môi trường để sẵn sàng chạy là test implementation. Test analysis (đã xong) là xác định test condition.',
  },
  {
    id: 'mxx-7', type: 'single', k: 'K2', lo: 'FL-1.5.3', topic: 'fundamentals',
    stem: 'A project assigns testing entirely to an independent test team in a separate department. Which of the following is a likely DRAWBACK of this high level of independence?',
    options: [
      { id: 'a', text: 'Testers are too close to the code and miss obvious defects' },
      { id: 'b', text: 'Isolation from the development team can cause communication problems and a bottleneck' },
      { id: 'c', text: 'Testers automatically share the developers’ assumptions and blind spots' },
      { id: 'd', text: 'Independent testers can never be objective about the product' },
    ],
    correct: ['b'],
    explanation: 'Độc lập cao có thể gây cô lập, thiếu giao tiếp với nhóm dev và trở thành nút thắt cổ chai, mất tinh thần "đồng sở hữu chất lượng". "Quá gần code" và "chia sẻ giả định/điểm mù của dev" lại là nhược điểm của ít độc lập.',
  },
  {
    id: 'mxx-8', type: 'truefalse', k: 'K2', lo: 'FL-1.4.4', topic: 'fundamentals',
    stem: 'Good traceability from test cases back to the test basis makes it possible to assess test coverage against requirements and to perform impact analysis when a requirement changes.',
    correct: ['true'],
    explanation: 'Đúng. Traceability cho phép đánh giá coverage so với requirement và phân tích tác động khi requirement thay đổi (biết test nào bị ảnh hưởng), đồng thời hỗ trợ audit và đánh giá tiến độ.',
  },

  // ============================================================
  // Chapter 2: Testing Throughout the SDLC (5)
  // ============================================================
  {
    id: 'mxx-9', type: 'single', k: 'K2', lo: 'FL-2.2.2', topic: 'lifecycle',
    stem: 'A team checks whether a banking system can still process transactions correctly after the underlying operating system is patched, even though no functional requirement changed. Which test type is this primarily?',
    options: [
      { id: 'a', text: 'Functional testing' },
      { id: 'b', text: 'Non-functional testing' },
      { id: 'c', text: 'White-box testing' },
      { id: 'd', text: 'Change-related (confirmation) testing' },
    ],
    correct: ['d'],
    explanation: 'Test sau khi môi trường thay đổi (patch OS) để bảo đảm hành vi không bị ảnh hưởng xấu là change-related testing (ở đây mang tính regression sau thay đổi). Nó không tập trung vào tính năng mới (functional) hay thuộc tính chất lượng (non-functional).',
  },
  {
    id: 'mxx-10', type: 'single', k: 'K2', lo: 'FL-2.2.1', topic: 'lifecycle',
    stem: 'A new payroll module passed component and integration testing. Now the whole end-to-end payroll workflow is tested against the documented system requirements in a production-like environment, by the test team. Which test level is this?',
    options: [
      { id: 'a', text: 'Component integration testing' },
      { id: 'b', text: 'System testing' },
      { id: 'c', text: 'Acceptance testing' },
      { id: 'd', text: 'Component testing' },
    ],
    correct: ['b'],
    explanation: 'Kiểm thử toàn bộ hệ thống/hành vi end-to-end so với system requirement, trong môi trường giống production, thường do test team thực hiện, là system testing. Acceptance testing hướng tới sự sẵn sàng triển khai và thường có người dùng/khách hàng tham gia.',
  },
  {
    id: 'mxx-11', type: 'single', k: 'K2', lo: 'FL-2.2.3', topic: 'lifecycle',
    stem: 'A defect was fixed in the checkout module. Limited time is available. The team must choose between re-running the failed test and running a broader set of tests around checkout. Which statement is correct?',
    options: [
      { id: 'a', text: 'Re-running the previously failed test is regression testing; the broader set is confirmation testing' },
      { id: 'b', text: 'Re-running the previously failed test is confirmation testing; the broader set checks for unintended side effects and is regression testing' },
      { id: 'c', text: 'Both are confirmation testing because they relate to the same fix' },
      { id: 'd', text: 'Neither is needed because the fix was already verified by the developer' },
    ],
    correct: ['b'],
    explanation: 'Chạy lại đúng test đã fail để xác nhận đã sửa là confirmation testing; chạy thêm test xung quanh để phát hiện tác dụng phụ ngoài ý muốn do thay đổi là regression testing. Cả hai khác nhau và đều có giá trị.',
  },
  {
    id: 'mxx-12', type: 'single', k: 'K2', lo: 'FL-2.3.1', topic: 'lifecycle',
    stem: 'An insurance company must migrate its policy data to a new database platform; the application logic is unchanged. Which statement about the testing triggered by this migration is correct?',
    options: [
      { id: 'a', text: 'No testing is needed because the application code did not change' },
      { id: 'b', text: 'It is maintenance testing triggered by migration, and should include checking the migrated data and that the system still works on the new platform' },
      { id: 'c', text: 'It is component testing of the new database' },
      { id: 'd', text: 'It is acceptance testing only, performed by end users' },
    ],
    correct: ['b'],
    explanation: 'Migration (chuyển nền tảng/dữ liệu) là một tác nhân điển hình kích hoạt maintenance testing. Cần kiểm thử dữ liệu đã chuyển và xác nhận hệ thống vẫn hoạt động trên nền tảng mới, kể cả khi code không đổi.',
  },
  {
    id: 'mxx-13', type: 'single', k: 'K2', lo: 'FL-2.1.5', topic: 'lifecycle',
    stem: 'Which of the following is the clearest example of a shift-left approach?',
    options: [
      { id: 'a', text: 'Adding more testers to the team just before the release date' },
      { id: 'b', text: 'Reviewing requirements and writing acceptance tests before the code is implemented' },
      { id: 'c', text: 'Postponing all testing until a stable build is available' },
      { id: 'd', text: 'Running performance tests only in the final acceptance phase' },
    ],
    correct: ['b'],
    explanation: 'Shift-left nghĩa là thực hiện hoạt động test sớm hơn: review requirement và viết acceptance test trước khi code. Các phương án còn lại đẩy test về sau (shift-right hoặc trì hoãn).',
  },

  // ============================================================
  // Chapter 3: Static Testing (5)
  // ============================================================
  {
    id: 'mxx-14', type: 'single', k: 'K2', lo: 'FL-3.1.3', topic: 'static',
    stem: 'Which of the following is an advantage of static testing over dynamic testing?',
    options: [
      { id: 'a', text: 'It can measure the actual response time of the system under load' },
      { id: 'b', text: 'It can find defects in a work product (e.g. a requirement) before any code exists to execute' },
      { id: 'c', text: 'It always finds more defects than dynamic testing' },
      { id: 'd', text: 'It can detect runtime memory leaks' },
    ],
    correct: ['b'],
    explanation: 'Static testing không cần chạy code nên có thể tìm defect rất sớm (vd trong requirement) trước khi có code để thực thi. Đo response time hay phát hiện memory leak runtime cần dynamic testing; static không "luôn tìm nhiều defect hơn".',
  },
  {
    id: 'mxx-15', type: 'single', k: 'K2', lo: 'FL-3.2.4', topic: 'static',
    stem: 'A team needs to obtain agreement on the architecture from senior engineers, with documentation prepared in advance and possibly metrics collected, but without the strict roles and rules of an inspection. Which review type best fits?',
    options: [
      { id: 'a', text: 'Informal review' },
      { id: 'b', text: 'Walkthrough' },
      { id: 'c', text: 'Technical review' },
      { id: 'd', text: 'Inspection' },
    ],
    correct: ['c'],
    explanation: 'Technical review do các chuyên gia kỹ thuật/đồng cấp thực hiện, có chuẩn bị, nhằm đạt đồng thuận và đánh giá kỹ thuật (vd kiến trúc), ít chính thức hơn inspection. Walkthrough thường do tác giả dẫn nhằm phổ biến/học hỏi; inspection là chính thức nhất.',
  },
  {
    id: 'mxx-16', type: 'single', k: 'K2', lo: 'FL-3.2.2', topic: 'static',
    stem: 'During which activity of the review process do participants individually examine the work product and note possible anomalies before any group discussion?',
    options: [
      { id: 'a', text: 'Planning' },
      { id: 'b', text: 'Individual review (preparation)' },
      { id: 'c', text: 'Issue communication and analysis (review meeting)' },
      { id: 'd', text: 'Fixing and reporting' },
    ],
    correct: ['b'],
    explanation: 'Trong giai đoạn individual review (preparation), từng người tự đọc work product và ghi nhận anomaly trước khi họp. Planning xác định phạm vi; review meeting là nơi thảo luận/phân tích; fixing diễn ra sau khi xác nhận defect.',
  },
  {
    id: 'mxx-17', type: 'single', k: 'K1', lo: 'FL-3.2.3', topic: 'static',
    stem: 'In a review, who has overall responsibility for the review, decides on its scope and whether the objectives have been met?',
    options: [
      { id: 'a', text: 'The scribe' },
      { id: 'b', text: 'The author' },
      { id: 'c', text: 'The review leader' },
      { id: 'd', text: 'The reviewer' },
    ],
    correct: ['c'],
    explanation: 'Review leader chịu trách nhiệm tổng thể cho cuộc review: quyết định ai tham gia, phạm vi và đánh giá mục tiêu đạt hay chưa. Scribe ghi chép, author tạo sản phẩm, reviewer tìm anomaly.',
  },
  {
    id: 'mxx-18', type: 'multi', k: 'K1', lo: 'FL-3.2.1', topic: 'static',
    stem: 'Which TWO of the following are benefits of early and frequent stakeholder feedback during static testing? (Choose two)',
    options: [
      { id: 'a', text: 'Misunderstandings about requirements are detected and corrected early' },
      { id: 'b', text: 'It guarantees that the delivered software will have zero defects' },
      { id: 'c', text: 'The development team is informed about stakeholder needs sooner, reducing rework later' },
      { id: 'd', text: 'It removes the need for any acceptance testing' },
    ],
    correct: ['a', 'c'],
    explanation: 'Phản hồi sớm/thường xuyên giúp phát hiện hiểu lầm về requirement sớm và truyền đạt nhu cầu stakeholder sớm hơn, giảm rework về sau. Nó không bảo đảm "zero defect" và không loại bỏ nhu cầu acceptance testing.',
  },

  // ============================================================
  // Chapter 4: Test Analysis and Design (11)
  // ============================================================
  {
    id: 'mxx-19', type: 'single', k: 'K3', lo: 'FL-4.2.1', topic: 'techniques',
    stem: 'A coupon field accepts a string of 4 to 8 characters. Using equivalence partitioning, which input set covers ONE value from each of the THREE partitions (too short, valid, too long)?',
    options: [
      { id: 'a', text: '"abc", "abcdef", "abcdefghi"' },
      { id: 'b', text: '"abcd", "abcdefgh", "abc"' },
      { id: 'c', text: '"abcde", "abcdef", "abcdefg"' },
      { id: 'd', text: '"ab", "abc", "abcd"' },
    ],
    correct: ['a'],
    explanation: 'Ba phân vùng theo độ dài: <4 (quá ngắn), 4..8 (hợp lệ), >8 (quá dài). "abc"(3) thuộc quá ngắn, "abcdef"(6) hợp lệ, "abcdefghi"(9) quá dài. Các phương án khác chứa nhiều giá trị cùng một phân vùng hợp lệ hoặc thiếu phân vùng quá dài.',
  },
  {
    id: 'mxx-20', type: 'single', k: 'K3', lo: 'FL-4.2.2', topic: 'techniques',
    stem: 'A thermostat accepts integer temperatures from 16 to 30 degrees inclusive. Using 3-value boundary value analysis for the LOWER boundary only, which values should be tested?',
    options: [
      { id: 'a', text: '16, 17, 18' },
      { id: 'b', text: '15, 16, 17' },
      { id: 'c', text: '14, 15, 16' },
      { id: 'd', text: '16, 30, 31' },
    ],
    correct: ['b'],
    explanation: 'BVA 3 điểm tại biên dưới gồm chính biên và hai giá trị liền kề hai phía: 15 (ngay dưới biên), 16 (biên), 17 (ngay trên biên). Phương án 16,17,18 thiếu giá trị ngoài biên; các phương án khác lệch biên.',
  },
  {
    id: 'mxx-21', type: 'single', k: 'K3', lo: 'FL-4.2.3', topic: 'techniques',
    stem: 'A loan is approved only if the applicant is employed AND has a credit score >= 700. If either condition is false, the loan is rejected. In a decision table, which rule combination results in the action "Approve loan"?',
    options: [
      { id: 'a', text: 'Employed = True, Score>=700 = False' },
      { id: 'b', text: 'Employed = False, Score>=700 = True' },
      { id: 'c', text: 'Employed = True, Score>=700 = True' },
      { id: 'd', text: 'Employed = False, Score>=700 = False' },
    ],
    correct: ['c'],
    explanation: 'Vì điều kiện là AND, chỉ khi cả hai cùng True thì mới "Approve loan". Mọi tổ hợp có ít nhất một điều kiện False đều dẫn tới "Reject".',
  },
  {
    id: 'mxx-22', type: 'single', k: 'K3', lo: 'FL-4.2.4', topic: 'techniques',
    stem: 'A door lock has states Locked and Unlocked. Event "card" toggles between them; event "timeout" in Unlocked returns to Locked; "timeout" in Locked is ignored. To achieve all-transitions (0-switch) coverage, what is the MINIMUM number of valid transitions that must be exercised?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4' },
      { id: 'd', text: '5' },
    ],
    correct: ['b'],
    explanation: 'Các valid transition: Locked--card-->Unlocked, Unlocked--card-->Locked, Unlocked--timeout-->Locked. ("timeout" ở Locked bị bỏ qua nên không phải transition trạng thái.) 0-switch coverage cần phủ cả 3 valid transition này.',
  },
  {
    id: 'mxx-23', type: 'single', k: 'K2', lo: 'FL-4.3.2', topic: 'techniques',
    stem: 'A function contains: if (x > 0) { doA(); } else { doB(); }. A single test with x = 5 is run. What branch coverage is achieved?',
    options: [
      { id: 'a', text: '100% branch coverage' },
      { id: 'b', text: '50% branch coverage' },
      { id: 'c', text: '0% branch coverage' },
      { id: 'd', text: '100% statement coverage and 100% branch coverage' },
    ],
    correct: ['b'],
    explanation: 'Có 2 nhánh (true và false của if). x=5 chỉ đi nhánh true (doA), nên phủ 1/2 = 50% branch. Để đạt 100% branch cần thêm test với x<=0 đi nhánh false (doB).',
  },
  {
    id: 'mxx-24', type: 'single', k: 'K2', lo: 'FL-4.3.1', topic: 'techniques',
    stem: 'Which statement about the relationship between statement coverage and branch coverage is CORRECT?',
    options: [
      { id: 'a', text: 'Achieving 100% statement coverage always implies 100% branch coverage' },
      { id: 'b', text: 'Achieving 100% branch coverage always implies 100% statement coverage' },
      { id: 'c', text: 'The two criteria are completely independent of each other' },
      { id: 'd', text: 'Statement coverage is stronger than branch coverage' },
    ],
    correct: ['b'],
    explanation: 'Branch coverage mạnh hơn (subsumes) statement coverage: phủ 100% nhánh thì mọi câu lệnh cũng được chạy. Chiều ngược lại không đúng (vd if không else: 100% statement nhưng chưa phủ nhánh false).',
  },
  {
    id: 'mxx-25', type: 'single', k: 'K2', lo: 'FL-4.4.1', topic: 'techniques',
    stem: 'A tester, drawing on past projects, deliberately enters a leading zero, a negative amount, and an SQL-like string into a numeric field, anticipating where developers commonly make mistakes. Which experience-based technique is this?',
    options: [
      { id: 'a', text: 'Exploratory testing' },
      { id: 'b', text: 'Checklist-based testing' },
      { id: 'c', text: 'Error guessing' },
      { id: 'd', text: 'Boundary value analysis' },
    ],
    correct: ['c'],
    explanation: 'Error guessing dựa trên kinh nghiệm/kiến thức về lỗi thường gặp để dự đoán nơi defect có thể ẩn và thiết kế test nhắm vào đó. BVA là kỹ thuật black-box dựa đặc tả; checklist dựa danh mục; exploratory phối hợp thiết kế-thực thi-học hỏi đồng thời.',
  },
  {
    id: 'mxx-26', type: 'single', k: 'K2', lo: 'FL-4.4.3', topic: 'techniques',
    stem: 'A team uses a standard "web accessibility" list of items (alt text present, keyboard navigable, sufficient contrast, etc.) to guide their testing. Which technique are they applying?',
    options: [
      { id: 'a', text: 'Error guessing' },
      { id: 'b', text: 'Checklist-based testing' },
      { id: 'c', text: 'Decision table testing' },
      { id: 'd', text: 'State transition testing' },
    ],
    correct: ['b'],
    explanation: 'Dùng một danh mục các mục cần kiểm (checklist) để hướng dẫn test là checklist-based testing — một kỹ thuật dựa trên kinh nghiệm. Nó không suy ra từ đặc tả hình thức như decision table hay state transition.',
  },
  {
    id: 'mxx-27', type: 'single', k: 'K2', lo: 'FL-4.1.1', topic: 'techniques',
    stem: 'Which statement BEST distinguishes white-box test techniques from black-box and experience-based techniques?',
    options: [
      { id: 'a', text: 'White-box techniques are based on the specification of the test object' },
      { id: 'b', text: 'White-box techniques are based on an analysis of the internal structure of the test object' },
      { id: 'c', text: 'White-box techniques rely on the knowledge and intuition of the tester' },
      { id: 'd', text: 'White-box techniques can only be applied to documents, not code' },
    ],
    correct: ['b'],
    explanation: 'White-box (structure-based) dựa trên phân tích cấu trúc nội bộ của đối tượng test (vd luồng điều khiển). Black-box dựa trên đặc tả/hành vi; experience-based dựa kiến thức/trực giác của tester.',
  },
  {
    id: 'mxx-28', type: 'single', k: 'K2', lo: 'FL-4.5.2', topic: 'techniques',
    stem: 'An acceptance criterion is written as: "Given a logged-in user with an empty cart, When they add an in-stock item, Then the cart count becomes 1." Which format is this?',
    options: [
      { id: 'a', text: 'Rule-oriented (verification list) format' },
      { id: 'b', text: 'Scenario-oriented (Given/When/Then) format' },
      { id: 'c', text: 'Decision table format' },
      { id: 'd', text: 'State transition format' },
    ],
    correct: ['b'],
    explanation: 'Cấu trúc Given/When/Then là dạng scenario-oriented để viết acceptance criteria (thường gắn với BDD). Dạng còn lại thường dùng là rule-oriented (danh sách điều kiện/quy tắc). Decision table và state transition là kỹ thuật thiết kế test, không phải định dạng acceptance criteria.',
  },
  {
    id: 'mxx-29', type: 'multi', k: 'K2', lo: 'FL-4.2.2', topic: 'techniques',
    stem: 'Which TWO statements about boundary value analysis (BVA) are CORRECT? (Choose two)',
    options: [
      { id: 'a', text: 'BVA is an extension of equivalence partitioning and can only be applied to ordered partitions' },
      { id: 'b', text: 'Boundaries are common locations for defects, so testing at and around them is effective' },
      { id: 'c', text: 'BVA replaces equivalence partitioning so that EP no longer needs to be applied' },
      { id: 'd', text: 'BVA can be applied to unordered, categorical partitions such as colour names' },
    ],
    correct: ['a', 'b'],
    explanation: 'BVA mở rộng equivalence partitioning và chỉ áp dụng cho phân vùng có thứ tự (số, ngày...); biên là nơi defect hay xuất hiện nên test quanh biên rất hiệu quả. BVA không thay thế EP (thường dùng kèm) và không áp dụng cho phân vùng không có thứ tự.',
  },

  // ============================================================
  // Chapter 5: Managing the Test Activities (9)
  // ============================================================
  {
    id: 'mxx-30', type: 'single', k: 'K2', lo: 'FL-5.1.3', topic: 'management',
    stem: 'A test team agrees: "Testing of the payment feature may start only when the build is deployed to the test environment and the smoke test passes." This statement is an example of:',
    options: [
      { id: 'a', text: 'Exit criteria (definition of done)' },
      { id: 'b', text: 'Entry criteria (definition of ready)' },
      { id: 'c', text: 'A test condition' },
      { id: 'd', text: 'A product risk' },
    ],
    correct: ['b'],
    explanation: 'Điều kiện phải thoả trước khi bắt đầu một hoạt động test là entry criteria (definition of ready). Exit criteria là điều kiện để coi hoạt động đã hoàn thành.',
  },
  {
    id: 'mxx-31', type: 'single', k: 'K3', lo: 'FL-5.1.4', topic: 'management',
    stem: 'Using three-point estimation, a task is estimated as optimistic = 6, most likely = 9, pessimistic = 18 person-days. What is the estimate using the formula (o + 4m + p) / 6?',
    options: [
      { id: 'a', text: '9 person-days' },
      { id: 'b', text: '10 person-days' },
      { id: 'c', text: '11 person-days' },
      { id: 'd', text: '12 person-days' },
    ],
    correct: ['b'],
    explanation: 'E = (o + 4m + p)/6 = (6 + 36 + 18)/6 = 60/6 = 10 person-days. Đây là công thức three-point (PERT) chuẩn dùng trong ước lượng test.',
  },
  {
    id: 'mxx-32', type: 'single', k: 'K3', lo: 'FL-5.1.5', topic: 'management',
    stem: 'A team has limited time and decides to run, first, the tests that cover the features most likely to fail and that would cause the greatest business damage if they did. Which test case prioritization strategy is this?',
    options: [
      { id: 'a', text: 'Coverage-based prioritization' },
      { id: 'b', text: 'Risk-based prioritization' },
      { id: 'c', text: 'Requirements-order prioritization' },
      { id: 'd', text: 'Alphabetical prioritization' },
    ],
    correct: ['b'],
    explanation: 'Ưu tiên test theo khả năng failure và mức thiệt hại nếu xảy ra chính là risk-based prioritization. Coverage-based ưu tiên để đạt coverage nhanh; các phương án còn lại không dựa trên rủi ro.',
  },
  {
    id: 'mxx-33', type: 'single', k: 'K2', lo: 'FL-5.2.2', topic: 'management',
    stem: 'The lead tester resigns two weeks before a critical release, threatening the schedule. From a risk perspective this is BEST classified as a:',
    options: [
      { id: 'a', text: 'Product risk' },
      { id: 'b', text: 'Project risk' },
      { id: 'c', text: 'Quality attribute' },
      { id: 'd', text: 'Defect' },
    ],
    correct: ['b'],
    explanation: 'Rủi ro liên quan tới quản lý/tổ chức/nhân sự/lịch của dự án là project risk. Product risk liên quan tới khả năng sản phẩm không đạt yêu cầu/chất lượng khi sử dụng.',
  },
  {
    id: 'mxx-34', type: 'single', k: 'K2', lo: 'FL-5.2.3', topic: 'management',
    stem: 'Product risk analysis indicates that the online checkout has a very high product risk. How should this MOST appropriately influence the testing?',
    options: [
      { id: 'a', text: 'Reduce the test effort on checkout to save time for low-risk areas' },
      { id: 'b', text: 'Apply more thorough techniques and broader coverage, and test it earlier' },
      { id: 'c', text: 'Skip testing checkout because high-risk features are usually well written' },
      { id: 'd', text: 'Test checkout exactly the same as every other feature' },
    ],
    correct: ['b'],
    explanation: 'Product risk cao dẫn tới test kỹ hơn (kỹ thuật mạnh hơn, coverage rộng hơn) và sớm hơn để giảm rủi ro sản phẩm. Giảm/ bỏ test cho vùng rủi ro cao đi ngược nguyên tắc risk-based testing.',
  },
  {
    id: 'mxx-35', type: 'single', k: 'K2', lo: 'FL-5.3.2', topic: 'management',
    stem: 'At the end of a test project, the test manager prepares a document summarizing what was tested, the results, deviations from the plan and an evaluation against exit criteria, addressed to stakeholders. This document is a:',
    options: [
      { id: 'a', text: 'Test progress report' },
      { id: 'b', text: 'Test summary (completion) report' },
      { id: 'c', text: 'Test plan' },
      { id: 'd', text: 'Defect report' },
    ],
    correct: ['b'],
    explanation: 'Tài liệu tổng kết khi kết thúc, đánh giá so với exit criteria và gửi stakeholder là test summary/completion report. Test progress report được phát hành định kỳ trong khi test đang diễn ra.',
  },
  {
    id: 'mxx-36', type: 'single', k: 'K2', lo: 'FL-5.4.1', topic: 'management',
    stem: 'How does configuration management PRIMARILY support testing?',
    options: [
      { id: 'a', text: 'It guarantees that all defects are fixed before release' },
      { id: 'b', text: 'It uniquely identifies and tracks versions of test items and testware so tests are reproducible and traceable' },
      { id: 'c', text: 'It estimates the effort required for the testing activities' },
      { id: 'd', text: 'It automatically writes the test cases from the requirements' },
    ],
    correct: ['b'],
    explanation: 'Configuration management định danh và quản lý phiên bản của test item và testware, bảo đảm có thể tái lập, truy vết và biết chính xác đang test phiên bản nào. Nó không tự sửa defect, ước lượng hay viết test case.',
  },
  {
    id: 'mxx-37', type: 'single', k: 'K3', lo: 'FL-5.5.1', topic: 'management',
    stem: 'A tester writes the following defect report: "Login is broken." A reviewer rejects it. Which improvement would MOST increase the report’s value?',
    options: [
      { id: 'a', text: 'Add the name of the developer responsible for the login module' },
      { id: 'b', text: 'Add steps to reproduce, the actual result observed and the expected result' },
      { id: 'c', text: 'Add an estimate of how long the fix will take in hours' },
      { id: 'd', text: 'Add the tester’s personal opinion about the code quality' },
    ],
    correct: ['b'],
    explanation: 'Một defect report tốt phải cho phép tái hiện và phân tích: cần các bước tái hiện, kết quả thực tế và kết quả mong đợi. Đổ lỗi developer, ước lượng thời gian sửa hay ý kiến cá nhân không phải nội dung cốt lõi.',
  },
  {
    id: 'mxx-38', type: 'single', k: 'K2', lo: 'FL-5.1.7', topic: 'management',
    stem: 'In the testing quadrants model, automated component and component-integration tests that are technology-facing and support the team are typically placed in which area?',
    options: [
      { id: 'a', text: 'The quadrant of business-facing tests that support the team (e.g. functional, story tests)' },
      { id: 'b', text: 'The quadrant of technology-facing tests that support the team (e.g. unit/component tests)' },
      { id: 'c', text: 'The quadrant of business-facing tests that critique the product (e.g. exploratory, usability)' },
      { id: 'd', text: 'The quadrant of technology-facing tests that critique the product (e.g. performance, security)' },
    ],
    correct: ['b'],
    explanation: 'Trong testing quadrants, unit/component và component-integration test là technology-facing và "support the team" (giúp đội phát triển). Business-facing/support-team là functional/story test; critique-product gồm exploratory/usability (business) và performance/security (technology).',
  },

  // ============================================================
  // Chapter 6: Test Tools (2)
  // ============================================================
  {
    id: 'mxx-39', type: 'single', k: 'K2', lo: 'FL-6.1.1', topic: 'tools',
    stem: 'A team needs a tool that examines source code WITHOUT executing it to detect coding-standard violations, overly complex structures and security weaknesses. Which type of tool is this?',
    options: [
      { id: 'a', text: 'A performance testing tool' },
      { id: 'b', text: 'A static analysis tool' },
      { id: 'c', text: 'A test execution (automation) tool' },
      { id: 'd', text: 'A coverage measurement tool' },
    ],
    correct: ['b'],
    explanation: 'Công cụ phân tích code mà không chạy nó, tìm vi phạm coding standard, độ phức tạp cao, điểm yếu bảo mật là static analysis tool (hỗ trợ static testing). Performance/test execution/coverage tool đều cần chạy code (dynamic).',
  },
  {
    id: 'mxx-40', type: 'multi', k: 'K1', lo: 'FL-6.2.1', topic: 'tools',
    stem: 'Which TWO of the following are genuine RISKS (rather than benefits) of test automation? (Choose two)',
    options: [
      { id: 'a', text: 'The effort to maintain automated scripts when the application changes is underestimated' },
      { id: 'b', text: 'Regression tests can be executed faster and more often' },
      { id: 'c', text: 'Unrealistic expectations are placed on the tool, including expecting it to do test design' },
      { id: 'd', text: 'Measurement of coverage becomes more objective and repeatable' },
    ],
    correct: ['a', 'c'],
    explanation: 'Rủi ro điển hình của test automation gồm đánh giá thấp công sức bảo trì script và kỳ vọng phi thực tế về công cụ. Chạy regression nhanh hơn và đo coverage khách quan hơn là lợi ích, không phải rủi ro.',
  },
]
