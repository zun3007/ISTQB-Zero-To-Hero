/* Chapter 1 — Fundamentals of Testing — SUPPLEMENTARY practice questions (CTFL v4.0 §1)
   IDs use the "q1x-" prefix to stay unique across the whole course. */

export default [
  {
    id: 'q1x-1', type: 'single', k: 'K2', lo: 'FL-1.1.2',
    topic: 'testing vs debugging',
    stem: 'A tester executes a test, observes that the displayed total is wrong, and logs a defect report. A developer then reproduces the problem, finds the faulty line, corrects it, and checks that the fix works. Which sequence correctly maps these steps to testing and debugging?',
    options: [
      { id: 'a', text: 'Observing the wrong total and logging the report = debugging; reproducing, fixing and checking the fix = testing' },
      { id: 'b', text: 'Observing the wrong total and logging the report = testing; reproducing, locating and fixing the cause = debugging; checking the fix = confirmation testing' },
      { id: 'c', text: 'All steps are part of debugging because they all involve the same defect' },
      { id: 'd', text: 'All steps are part of testing because a tester started the process' },
    ],
    correct: ['b'],
    explanation:
      'Quan sát hành vi sai (failure) và ghi nhận defect report là hoạt động của testing. Tái hiện, định vị và sửa nguyên nhân là debugging (do dev). Sau khi sửa, chạy lại để xác nhận đã hết là confirmation testing — lại thuộc testing. (a) đảo ngược vai trò. (c)/(d) sai vì testing và debugging là hai hoạt động khác mục đích, không gộp chỉ vì cùng một defect hay cùng một người khởi xướng.',
  },
  {
    id: 'q1x-2', type: 'multi', k: 'K2', lo: 'FL-1.2.1',
    topic: 'why testing necessary',
    stem: 'Which of the following are valid reasons why testing is necessary? (Choose TWO)',
    options: [
      { id: 'a', text: 'Testing guarantees that the software will be free of defects after release' },
      { id: 'b', text: 'Testing reduces the risk of failures occurring during operation' },
      { id: 'c', text: 'Component and system testing can help meet contractual or legal requirements' },
      { id: 'd', text: 'Testing proves that the software is correct under all possible conditions' },
    ],
    correct: ['b', 'c'],
    explanation:
      'Testing giúp giảm rủi ro xảy ra failure khi vận hành (b) và có thể giúp đáp ứng yêu cầu hợp đồng/luật định/tiêu chuẩn ngành (c). (a) sai vì testing không bao giờ đảm bảo phần mềm hết defect — vi phạm nguyên lý "testing shows the presence of defects". (d) sai vì exhaustive testing là bất khả thi nên không thể chứng minh đúng trong mọi điều kiện.',
  },
  {
    id: 'q1x-3', type: 'single', k: 'K2', lo: 'FL-1.2.3',
    topic: 'error-defect-failure',
    stem: 'A spacecraft system suddenly produces wrong navigation output, but a thorough code review finds no defect in the software. Investigation shows that intense electromagnetic radiation corrupted a value in memory during the flight. Which statement is correct?',
    options: [
      { id: 'a', text: 'This is a failure that was not caused by a defect in the code' },
      { id: 'b', text: 'This is a defect that will always lead to a failure' },
      { id: 'c', text: 'This is an error made by a human during coding' },
      { id: 'd', text: 'This cannot be a failure because no defect was found' },
    ],
    correct: ['a'],
    explanation:
      'Đây là một failure (hành vi sai quan sát được khi chạy) nhưng nguyên nhân là điều kiện môi trường (bức xạ điện từ), không phải defect trong code. ISTQB nêu rõ failure có thể do điều kiện môi trường gây ra chứ không chỉ do defect. (b)/(c) sai vì không có defect cũng không có error của con người. (d) sai vì failure được định nghĩa theo hành vi sai khi vận hành, không bắt buộc phải truy ra defect.',
  },
  {
    id: 'q1x-4', type: 'single', k: 'K2', lo: 'FL-1.2.3',
    topic: 'root cause',
    stem: 'After several invoices were calculated incorrectly, an analysis traced the problem back to inadequate training that caused analysts to repeatedly misunderstand the tax rules. Removing this would prevent similar defects in the future. What does this inadequate training represent?',
    options: [
      { id: 'a', text: 'A failure' },
      { id: 'b', text: 'A defect' },
      { id: 'c', text: 'The root cause' },
      { id: 'd', text: 'An error' },
    ],
    correct: ['c'],
    explanation:
      'Root cause là nguyên nhân gốc rễ sâu nhất mà nếu loại bỏ sẽ ngăn vấn đề (và những vấn đề tương tự) tái diễn — ở đây là việc đào tạo không đầy đủ. Việc hiểu nhầm quy tắc thuế là error; code tính sai là defect; hoá đơn sai là failure. Câu hỏi nhấn vào "removing this would prevent similar defects" — dấu hiệu kinh điển của root cause.',
  },
  {
    id: 'q1x-5', type: 'single', k: 'K2', lo: 'FL-1.3.1',
    topic: 'principles',
    stem: 'A safety-critical medical device and a simple internal reporting tool are being tested by the same organisation, but with very different test approaches, rigour and documentation. Which testing principle best justifies this difference?',
    options: [
      { id: 'a', text: 'Testing shows the presence of defects, not their absence' },
      { id: 'b', text: 'Testing is context dependent' },
      { id: 'c', text: 'Defects cluster together' },
      { id: 'd', text: 'Early testing saves time and money' },
    ],
    correct: ['b'],
    explanation:
      'Cách test phải phù hợp với ngữ cảnh (mức rủi ro, lĩnh vực, ràng buộc): thiết bị y tế an toàn-tới-tính-mạng cần test nghiêm ngặt hơn nhiều so với công cụ báo cáo nội bộ — đúng nguyên lý "testing is context dependent". Các nguyên lý còn lại không giải thích sự khác biệt về độ nghiêm ngặt giữa hai dự án.',
  },
  {
    id: 'q1x-6', type: 'single', k: 'K3', lo: 'FL-1.3.1',
    topic: 'principles',
    stem: 'A team must test a function with two independent inputs, each accepting any 32-bit integer. A colleague proposes "just test every possible combination of inputs to be completely sure there are no defects." How should this proposal be evaluated against the testing principles?',
    options: [
      { id: 'a', text: 'It is sound, because exhaustive testing is the most reliable way to guarantee no defects' },
      { id: 'b', text: 'It violates both "exhaustive testing is impossible" and the idea that testing cannot prove the absence of defects; risk-based prioritisation should be used instead' },
      { id: 'c', text: 'It only violates the defect clustering principle' },
      { id: 'd', text: 'It is the correct application of the early testing principle' },
    ],
    correct: ['b'],
    explanation:
      'Test mọi tổ hợp của hai số nguyên 32-bit là bất khả thi trên thực tế (số tổ hợp khổng lồ) — vi phạm "exhaustive testing is impossible". Đồng thời, ngay cả nếu làm được thì test cũng không thể chứng minh "không còn defect" (presence, not absence). Thay vào đó dùng kỹ thuật và ưu tiên theo rủi ro. (a) sai cả về tính khả thi lẫn nguyên lý; (c)/(d) chọn nhầm nguyên lý.',
  },
  {
    id: 'q1x-7', type: 'single', k: 'K2', lo: 'FL-1.4.2',
    topic: 'context of test process',
    stem: 'Which of the following is a contextual factor that influences how the test process is carried out?',
    options: [
      { id: 'a', text: 'The personal preference of an individual tester for a favourite tool' },
      { id: 'b', text: 'The software development lifecycle model and the level of risk involved' },
      { id: 'c', text: 'The total number of test cases that must always be exactly 100' },
      { id: 'd', text: 'A rule that every project must use the identical fixed test process' },
    ],
    correct: ['b'],
    explanation:
      'Quy trình test chịu tác động bởi các yếu tố ngữ cảnh như mô hình SDLC, mức rủi ro, lĩnh vực, ràng buộc pháp lý/hợp đồng, kỹ năng nhóm và công cụ sẵn có. (b) đúng. (a) là sở thích cá nhân, không phải yếu tố ngữ cảnh chuẩn. (c)/(d) trái với chính ý "không có quy trình test cố định chung cho mọi dự án".',
  },
  {
    id: 'q1x-8', type: 'multi', k: 'K2', lo: 'FL-1.4.3',
    topic: 'testware',
    stem: 'Which of the following are examples of testware produced during the test process? (Choose TWO)',
    options: [
      { id: 'a', text: 'Test cases and test data' },
      { id: 'b', text: 'The production source code of the application under test' },
      { id: 'c', text: 'Test logs and defect reports' },
      { id: 'd', text: 'The signed customer contract for the project' },
    ],
    correct: ['a', 'c'],
    explanation:
      'Testware là các work product sinh ra trong quá trình test: test case, test data (từ design/implementation) và test logs, defect reports (từ execution). (b) là mã nguồn sản phẩm — đối tượng được test, không phải testware. (d) là tài liệu hợp đồng dự án, không phải testware.',
  },
  {
    id: 'q1x-9', type: 'single', k: 'K2', lo: 'FL-1.4.1',
    topic: 'test process',
    stem: 'At the end of a project, the team archives the testware for reuse, evaluates lessons learned, and produces a test summary report for stakeholders. Which test activity does this describe?',
    options: [
      { id: 'a', text: 'Test implementation' },
      { id: 'b', text: 'Test execution' },
      { id: 'c', text: 'Test completion' },
      { id: 'd', text: 'Test planning' },
    ],
    correct: ['c'],
    explanation:
      'Lưu trữ testware để tái sử dụng, rút bài học kinh nghiệm và lập test summary report là các nhiệm vụ của test completion (hoàn tất kiểm thử), thường diễn ra ở mốc kết thúc dự án/giai đoạn. Test implementation chuẩn bị môi trường và procedure; test execution chạy test và log kết quả; test planning lập kế hoạch ở đầu.',
  },
  {
    id: 'q1x-10', type: 'single', k: 'K2', lo: 'FL-1.4.5',
    topic: 'roles',
    stem: 'In a project, one person is responsible for planning, monitoring and controlling the test activities, while another focuses on analysing, designing and executing the tests. Which roles do these two people primarily perform?',
    options: [
      { id: 'a', text: 'Both perform the testing role' },
      { id: 'b', text: 'The first performs the test management role; the second performs the testing role' },
      { id: 'c', text: 'The first performs the testing role; the second performs the test management role' },
      { id: 'd', text: 'Both perform the test management role' },
    ],
    correct: ['b'],
    explanation:
      'ISTQB v4.0 phân biệt hai vai trò chính: test management role (lập kế hoạch, giám sát, điều phối hoạt động test) và testing role (phân tích, thiết kế, thực thi test). Người lập kế hoạch/giám sát giữ test management role; người phân tích/thiết kế/chạy test giữ testing role. Lưu ý: tuỳ ngữ cảnh, một người có thể đảm nhận cả hai vai trò.',
  },
  {
    id: 'q1x-11', type: 'single', k: 'K2', lo: 'FL-1.5.1',
    topic: 'tester skills',
    stem: 'A tester writes the following defect report: "The developer is careless again — this module is rubbish and clearly never tested." Which essential tester skill does this report most clearly fail to demonstrate?',
    options: [
      { id: 'a', text: 'Domain knowledge of the application area' },
      { id: 'b', text: 'Effective and constructive communication when reporting defects' },
      { id: 'c', text: 'Technical knowledge of the system under test' },
      { id: 'd', text: 'Knowledge of test design techniques' },
    ],
    correct: ['b'],
    explanation:
      'Báo cáo này quy kết cá nhân, không mô tả hiện tượng/sự thật khách quan — thiếu kỹ năng giao tiếp tốt và mang tính xây dựng khi báo cáo defect. Mục tiêu là sửa sản phẩm chứ không phải "bắt lỗi người". Nội dung không liên quan trực tiếp tới kiến thức domain, kiến thức kỹ thuật hay kỹ thuật thiết kế test.',
  },
  {
    id: 'q1x-12', type: 'truefalse', k: 'K2', lo: 'FL-1.5.3',
    topic: 'independence',
    stem: 'Tasks tested by the author of the work product (the lowest level of independence) are necessarily of lower value than tasks tested by an independent test team, and so author self-testing should always be avoided.',
    correct: ['false'],
    explanation:
      'Sai. Tự test bởi tác giả vẫn có giá trị: nhanh, rẻ và giúp phát hiện sớm nhiều defect ngay khi viết. Độc lập cao hơn thường tìm được loại defect khác và khách quan hơn, nhưng cũng có đánh đổi (cô lập, giao tiếp chậm, dev dễ đùn trách nhiệm chất lượng). ISTQB khuyến nghị phối hợp nhiều mức độ độc lập tuỳ ngữ cảnh, không phủ nhận hoàn toàn việc tác giả tự test.',
  },
]
