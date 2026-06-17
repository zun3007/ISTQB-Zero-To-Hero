/*
  Dedicated mock-exam question bank (exam-realistic wording). The ExamView builds
  a 40-question paper by combining this bank with chapter-quiz questions across all
  chapters, weighted to mirror the real CTFL v4.0 distribution. Authors expand this
  bank; the exam still works with whatever is present (it tops up from chapter quizzes).
*/

export const mockExam = [
  {
    id: 'mx-1', type: 'single', k: 'K1', lo: 'FL-1.1.1', topic: 'fundamentals',
    stem: 'Which of the following is a valid objective of testing?',
    options: [
      { id: 'a', text: 'To prove the software is completely defect-free' },
      { id: 'b', text: 'To build confidence in the level of quality' },
      { id: 'c', text: 'To fix all defects found' },
      { id: 'd', text: 'To replace quality assurance' },
    ],
    correct: ['b'],
    explanation: 'Test không thể chứng minh “hoàn toàn không lỗi”. Tạo niềm tin vào mức chất lượng là mục tiêu chuẩn.',
  },
  {
    id: 'mx-2', type: 'single', k: 'K2', lo: 'FL-1.3.1', topic: 'principles',
    stem: 'Early testing primarily helps to:',
    options: [
      { id: 'a', text: 'Guarantee zero defects' },
      { id: 'b', text: 'Reduce the cost of fixing defects' },
      { id: 'c', text: 'Eliminate the need for dynamic testing' },
      { id: 'd', text: 'Avoid the pesticide paradox' },
    ],
    correct: ['b'],
    explanation: 'Phát hiện defect sớm thì sửa rẻ hơn nhiều — nền tảng của nguyên lý “early testing saves time and money”.',
  },

  // ===== Chapter 1: Fundamentals of Testing (6) =====
  {
    id: 'mx-3', type: 'single', k: 'K1', lo: 'FL-1.1.1', topic: 'fundamentals',
    stem: 'Which statement best describes the difference between testing and debugging?',
    options: [
      { id: 'a', text: 'Testing locates and fixes the defect; debugging finds the failure' },
      { id: 'b', text: 'Testing can trigger failures caused by defects; debugging finds, analyses and fixes those defects' },
      { id: 'c', text: 'Testing and debugging are two names for the same activity' },
      { id: 'd', text: 'Debugging is performed only by independent testers' },
    ],
    correct: ['b'],
    explanation: 'Testing có thể gây ra failure do defect; debugging là hoạt động phát triển nhằm tìm, phân tích và sửa defect. Đây là hai hoạt động khác nhau.',
  },
  {
    id: 'mx-4', type: 'single', k: 'K2', lo: 'FL-1.2.2', topic: 'fundamentals',
    stem: 'A tester runs a test case with input "0". The expected result is "Error: value must be positive", but the system displays "OK". What term describes "OK"?',
    options: [
      { id: 'a', text: 'A defect' },
      { id: 'b', text: 'An error' },
      { id: 'c', text: 'A failure' },
      { id: 'd', text: 'A root cause' },
    ],
    correct: ['c'],
    explanation: 'Kết quả thực tế khác kết quả mong đợi quan sát được khi chạy là một failure. Defect là nguyên nhân bên trong code, error là sai lầm của con người.',
  },
  {
    id: 'mx-5', type: 'single', k: 'K2', lo: 'FL-1.3.1', topic: 'principles',
    stem: 'Repeating the same set of tests over and over will eventually no longer find new defects. Which testing principle does this describe?',
    options: [
      { id: 'a', text: 'Testing is context dependent' },
      { id: 'b', text: 'Tests wear out' },
      { id: 'c', text: 'Absence-of-errors fallacy' },
      { id: 'd', text: 'Defects cluster together' },
    ],
    correct: ['b'],
    explanation: 'Đây là nguyên lý “Tests wear out” (pesticide paradox): bộ test cũ dần mất hiệu quả tìm defect mới, cần cập nhật/đổi mới test.',
  },
  {
    id: 'mx-6', type: 'single', k: 'K1', lo: 'FL-1.4.1', topic: 'fundamentals',
    stem: 'In which test activity is the test basis analysed to determine testable features and to define test conditions?',
    options: [
      { id: 'a', text: 'Test planning' },
      { id: 'b', text: 'Test analysis' },
      { id: 'c', text: 'Test design' },
      { id: 'd', text: 'Test implementation' },
    ],
    correct: ['b'],
    explanation: 'Test analysis trả lời câu hỏi “what to test”: phân tích test basis để xác định test conditions. Test design trả lời “how to test”.',
  },
  {
    id: 'mx-7', type: 'single', k: 'K2', lo: 'FL-1.4.2', topic: 'fundamentals',
    stem: 'Which of the following is an example of traceability between the test basis and test work products?',
    options: [
      { id: 'a', text: 'Linking each test case to the requirement it verifies' },
      { id: 'b', text: 'Counting the number of defects found per tester' },
      { id: 'c', text: 'Recording the time spent executing tests' },
      { id: 'd', text: 'Storing the test environment configuration' },
    ],
    correct: ['a'],
    explanation: 'Traceability liên kết các test work product (vd test case) ngược về test basis (vd requirement), giúp đánh giá coverage và phân tích tác động.',
  },
  {
    id: 'mx-8', type: 'multi', k: 'K2', lo: 'FL-1.5.1', topic: 'fundamentals',
    stem: 'Which TWO of the following are essential skills for a good tester? (Choose two)',
    options: [
      { id: 'a', text: 'Strong communication skills' },
      { id: 'b', text: 'The ability to write all of the production code' },
      { id: 'c', text: 'Analytical thinking and a critical mindset' },
      { id: 'd', text: 'Authority to release the product without sign-off' },
    ],
    correct: ['a', 'c'],
    explanation: 'Tester cần kỹ năng giao tiếp tốt và tư duy phân tích/phản biện. Viết toàn bộ production code hay tự quyết release không phải là kỹ năng cốt lõi của tester.',
  },

  // ===== Chapter 2: Testing Throughout the SDLC (4) =====
  {
    id: 'mx-9', type: 'single', k: 'K2', lo: 'FL-2.1.1', topic: 'lifecycle',
    stem: 'In a sequential development model such as the V-model, when should test analysis and design for acceptance testing ideally begin?',
    options: [
      { id: 'a', text: 'After the code has been written' },
      { id: 'b', text: 'During the corresponding requirements/specification phase' },
      { id: 'c', text: 'Only during the acceptance test execution phase' },
      { id: 'd', text: 'After system testing is complete' },
    ],
    correct: ['b'],
    explanation: 'Trong V-model, mỗi cấp test gắn với một pha phát triển tương ứng; thiết kế test bắt đầu sớm cùng pha đặc tả tương ứng (shift-left).',
  },
  {
    id: 'mx-10', type: 'single', k: 'K2', lo: 'FL-2.1.3', topic: 'lifecycle',
    stem: 'A developer writes a failing automated test first, then writes just enough code to make it pass, then refactors. Which approach is this?',
    options: [
      { id: 'a', text: 'Acceptance test-driven development (ATDD)' },
      { id: 'b', text: 'Behaviour-driven development (BDD)' },
      { id: 'c', text: 'Test-driven development (TDD)' },
      { id: 'd', text: 'Exploratory testing' },
    ],
    correct: ['c'],
    explanation: 'Chu trình red-green-refactor (viết test thất bại trước, code cho pass, rồi refactor) là đặc trưng của TDD.',
  },
  {
    id: 'mx-11', type: 'single', k: 'K2', lo: 'FL-2.2.1', topic: 'lifecycle',
    stem: 'Which test level focuses on verifying the interfaces and interactions between integrated components or systems?',
    options: [
      { id: 'a', text: 'Component testing' },
      { id: 'b', text: 'Integration testing' },
      { id: 'c', text: 'System testing' },
      { id: 'd', text: 'Acceptance testing' },
    ],
    correct: ['b'],
    explanation: 'Integration testing tập trung vào giao diện và tương tác giữa các component/hệ thống đã được tích hợp (component integration và system integration testing).',
  },
  {
    id: 'mx-12', type: 'single', k: 'K2', lo: 'FL-2.2.3', topic: 'lifecycle',
    stem: 'After a defect fix is deployed, the same failed tests are re-run to confirm the defect is resolved. What is this called?',
    options: [
      { id: 'a', text: 'Regression testing' },
      { id: 'b', text: 'Confirmation testing' },
      { id: 'c', text: 'Maintenance testing' },
      { id: 'd', text: 'Smoke testing' },
    ],
    correct: ['b'],
    explanation: 'Chạy lại đúng các test đã fail để xác nhận defect đã được sửa là confirmation testing (re-testing). Regression testing kiểm tra phần khác không bị ảnh hưởng xấu.',
  },

  // ===== Chapter 3: Static Testing (4) =====
  {
    id: 'mx-13', type: 'single', k: 'K2', lo: 'FL-3.1.1', topic: 'static',
    stem: 'Which of the following can be examined by static testing but NOT by dynamic testing?',
    options: [
      { id: 'a', text: 'Performance under load' },
      { id: 'b', text: 'Maintainability defects in source code that is never executed' },
      { id: 'c', text: 'Memory leaks at runtime' },
      { id: 'd', text: 'Response time of a transaction' },
    ],
    correct: ['b'],
    explanation: 'Static testing không chạy code nên có thể phát hiện defect trong code/tài liệu không thực thi (vd maintainability, coding standard). Performance/memory leak/response time cần dynamic testing.',
  },
  {
    id: 'mx-14', type: 'single', k: 'K1', lo: 'FL-3.2.1', topic: 'static',
    stem: 'Which review type is characterised by being led by the author, with the main objective of finding defects and is relatively informal?',
    options: [
      { id: 'a', text: 'Inspection' },
      { id: 'b', text: 'Walkthrough' },
      { id: 'c', text: 'Technical review' },
      { id: 'd', text: 'Audit' },
    ],
    correct: ['b'],
    explanation: 'Walkthrough thường do tác giả dẫn dắt, có thể tương đối phi chính thức, nhằm tìm defect và đạt hiểu biết chung. Inspection là chính thức nhất, do moderator dẫn.',
  },
  {
    id: 'mx-15', type: 'single', k: 'K2', lo: 'FL-3.2.3', topic: 'static',
    stem: 'During a formal review, who is responsible for ensuring the review process is followed and for moderating the meeting?',
    options: [
      { id: 'a', text: 'The author' },
      { id: 'b', text: 'The scribe' },
      { id: 'c', text: 'The facilitator (moderator)' },
      { id: 'd', text: 'The review leader' },
    ],
    correct: ['c'],
    explanation: 'Facilitator (moderator) đảm bảo cuộc họp review diễn ra hiệu quả, điều phối thảo luận và duy trì trật tự. Scribe ghi chép, author tạo sản phẩm, review leader quyết định người tham gia.',
  },
  {
    id: 'mx-16', type: 'single', k: 'K2', lo: 'FL-3.1.2', topic: 'static',
    stem: 'Which of the following is a key benefit of involving stakeholders in early static testing of requirements?',
    options: [
      { id: 'a', text: 'It guarantees the code will have no defects' },
      { id: 'b', text: 'It detects and removes defects before dynamic testing, when they are cheaper to fix' },
      { id: 'c', text: 'It replaces the need for any dynamic testing' },
      { id: 'd', text: 'It measures the system response time accurately' },
    ],
    correct: ['b'],
    explanation: 'Static testing sớm trên requirement giúp phát hiện và loại bỏ defect trước khi dynamic testing, khi chi phí sửa thấp hơn nhiều — đồng thời tăng đồng thuận giữa các bên.',
  },

  // ===== Chapter 4: Test Analysis and Design (9) =====
  {
    id: 'mx-17', type: 'single', k: 'K3', lo: 'FL-4.2.1', topic: 'techniques',
    stem: 'A field accepts ages from 18 to 65 inclusive. Using two-point boundary value analysis, which set of values tests the boundaries correctly?',
    options: [
      { id: 'a', text: '17, 18, 65, 66' },
      { id: 'b', text: '18, 65' },
      { id: 'c', text: '0, 18, 65, 100' },
      { id: 'd', text: '17, 66' },
    ],
    correct: ['a'],
    explanation: 'BVA hai điểm dùng giá trị biên và giá trị liền kề ngoài biên: 17/18 quanh biên dưới và 65/66 quanh biên trên.',
  },
  {
    id: 'mx-18', type: 'single', k: 'K2', lo: 'FL-4.1.1', topic: 'techniques',
    stem: 'Which statement best characterises black-box test techniques?',
    options: [
      { id: 'a', text: 'They are based on the internal structure of the test object' },
      { id: 'b', text: 'They derive tests from the specification or behaviour of the test object without reference to its internal structure' },
      { id: 'c', text: 'They always achieve 100% statement coverage' },
      { id: 'd', text: 'They can only be used at component test level' },
    ],
    correct: ['b'],
    explanation: 'Black-box (specification-based) techniques dựa trên đặc tả/hành vi của đối tượng test mà không quan tâm cấu trúc nội bộ.',
  },
  {
    id: 'mx-19', type: 'single', k: 'K3', lo: 'FL-4.2.1', topic: 'techniques',
    stem: 'A discount system applies: <100 = no discount, 100–499 = 5%, >=500 = 10%. Using equivalence partitioning, how many valid partitions exist for the order amount?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4' },
      { id: 'd', text: '6' },
    ],
    correct: ['b'],
    explanation: 'Có 3 phân vùng hợp lệ tương ứng 3 mức chiết khấu: [dưới 100], [100–499], [từ 500 trở lên]. Mỗi phân vùng các phần tử được xử lý như nhau.',
  },
  {
    id: 'mx-20', type: 'single', k: 'K3', lo: 'FL-4.2.3', topic: 'techniques',
    stem: 'A decision table has 3 independent boolean conditions. What is the maximum number of unique combinations (columns) in the full table?',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '6' },
      { id: 'c', text: '8' },
      { id: 'd', text: '9' },
    ],
    correct: ['c'],
    explanation: 'Mỗi điều kiện boolean có 2 giá trị, 3 điều kiện độc lập cho 2^3 = 8 tổ hợp (8 cột) trong decision table đầy đủ.',
  },
  {
    id: 'mx-21', type: 'single', k: 'K3', lo: 'FL-4.2.4', topic: 'techniques',
    stem: 'In state transition testing, a test that exercises every valid transition at least once achieves which coverage?',
    options: [
      { id: 'a', text: 'All states (0-switch coverage of states)' },
      { id: 'b', text: 'All valid transitions (0-switch / single transition coverage)' },
      { id: 'c', text: 'All pairs of transitions (1-switch coverage)' },
      { id: 'd', text: 'All invalid transitions only' },
    ],
    correct: ['b'],
    explanation: 'Phủ mọi valid transition ít nhất một lần là 0-switch coverage (single transition coverage). 1-switch phủ mọi cặp transition liên tiếp.',
  },
  {
    id: 'mx-22', type: 'single', k: 'K2', lo: 'FL-4.3.1', topic: 'techniques',
    stem: 'A test suite achieves 100% statement coverage. Which statement is true?',
    options: [
      { id: 'a', text: 'It guarantees 100% branch coverage' },
      { id: 'b', text: 'Every executable statement has been exercised at least once, but some branches may be untested' },
      { id: 'c', text: 'All defects in the code have been found' },
      { id: 'd', text: 'It is equivalent to 100% path coverage' },
    ],
    correct: ['b'],
    explanation: '100% statement coverage chỉ đảm bảo mọi câu lệnh thực thi được chạy ít nhất một lần; vẫn có thể bỏ sót nhánh (vd nhánh false của if không có else). Branch coverage mạnh hơn statement coverage.',
  },
  {
    id: 'mx-23', type: 'single', k: 'K2', lo: 'FL-4.3.1', topic: 'techniques',
    stem: 'Which of the following is the main rationale for using white-box test techniques?',
    options: [
      { id: 'a', text: 'To measure and increase coverage of the code structure' },
      { id: 'b', text: 'To avoid reading the specification' },
      { id: 'c', text: 'To test only the user interface' },
      { id: 'd', text: 'To eliminate the need for test design' },
    ],
    correct: ['a'],
    explanation: 'White-box (structure-based) techniques nhằm đo và tăng coverage của cấu trúc code (vd statement, branch), giúp đánh giá độ kỹ lưỡng của bộ test.',
  },
  {
    id: 'mx-24', type: 'single', k: 'K2', lo: 'FL-4.4.1', topic: 'techniques',
    stem: 'An experienced tester, without predefined test cases, simultaneously designs and executes tests, learning about the system as they go. This is an example of:',
    options: [
      { id: 'a', text: 'Checklist-based testing' },
      { id: 'b', text: 'Error guessing' },
      { id: 'c', text: 'Exploratory testing' },
      { id: 'd', text: 'Decision table testing' },
    ],
    correct: ['c'],
    explanation: 'Exploratory testing là kỹ thuật dựa trên kinh nghiệm, trong đó việc thiết kế, thực thi và đánh giá test diễn ra đồng thời, dựa trên hiểu biết tích lũy về hệ thống.',
  },
  {
    id: 'mx-25', type: 'multi', k: 'K2', lo: 'FL-4.5.1', topic: 'techniques',
    stem: 'Which TWO of the following are collaboration-based test approaches that help define agreed acceptance criteria? (Choose two)',
    options: [
      { id: 'a', text: 'Acceptance test-driven development (ATDD)' },
      { id: 'b', text: 'Boundary value analysis' },
      { id: 'c', text: 'Behaviour-driven development (BDD)' },
      { id: 'd', text: 'Statement testing' },
    ],
    correct: ['a', 'c'],
    explanation: 'ATDD và BDD là các phương pháp collaboration-based (user story writing), giúp các bên cùng thống nhất acceptance criteria/ví dụ. BVA và statement testing là kỹ thuật phân tích, không phải collaboration-based.',
  },

  // ===== Chapter 5: Managing the Test Activities (5) =====
  {
    id: 'mx-26', type: 'single', k: 'K2', lo: 'FL-5.1.1', topic: 'management',
    stem: 'Which of the following is typically documented in a test plan?',
    options: [
      { id: 'a', text: 'The exact defects that will be found' },
      { id: 'b', text: 'The scope, objectives, approach, entry and exit criteria of testing' },
      { id: 'c', text: 'The source code of the application under test' },
      { id: 'd', text: 'The salaries of the test team' },
    ],
    correct: ['b'],
    explanation: 'Test plan mô tả phạm vi, mục tiêu, cách tiếp cận, lịch, vai trò, và entry/exit criteria của hoạt động test. Không thể biết trước chính xác defect nào sẽ tìm thấy.',
  },
  {
    id: 'mx-27', type: 'single', k: 'K2', lo: 'FL-5.1.4', topic: 'management',
    stem: 'A team agrees that testing will stop only when all planned tests are run and no critical defects remain open. This agreement is an example of:',
    options: [
      { id: 'a', text: 'Entry criteria' },
      { id: 'b', text: 'Exit criteria (definition of done)' },
      { id: 'c', text: 'A test charter' },
      { id: 'd', text: 'A test condition' },
    ],
    correct: ['b'],
    explanation: 'Điều kiện để kết thúc/coi như hoàn thành một hoạt động test là exit criteria (definition of done). Entry criteria là điều kiện để bắt đầu.',
  },
  {
    id: 'mx-28', type: 'single', k: 'K3', lo: 'FL-5.2.1', topic: 'management',
    stem: 'A risk has a high likelihood and a high impact. According to risk-based testing, how should it influence the test effort?',
    options: [
      { id: 'a', text: 'It should receive less testing effort because it is obvious' },
      { id: 'b', text: 'It should receive more thorough and/or earlier testing effort' },
      { id: 'c', text: 'It should be ignored until it becomes a defect' },
      { id: 'd', text: 'Risk level has no effect on test effort' },
    ],
    correct: ['b'],
    explanation: 'Risk-based testing phân bổ effort theo mức risk: risk cao (likelihood × impact) được test kỹ hơn và/hoặc sớm hơn để giảm rủi ro sản phẩm.',
  },
  {
    id: 'mx-29', type: 'single', k: 'K1', lo: 'FL-5.5.1', topic: 'management',
    stem: 'Which of the following items should ALWAYS be included in a good defect report?',
    options: [
      { id: 'a', text: 'The name of the developer who introduced the defect' },
      { id: 'b', text: 'Steps to reproduce, expected and actual results' },
      { id: 'c', text: 'A proposed code fix' },
      { id: 'd', text: 'The estimated repair cost in currency' },
    ],
    correct: ['b'],
    explanation: 'Defect report phải cho phép tái hiện và phân tích: cần các bước tái hiện, kết quả mong đợi và kết quả thực tế. Đổ lỗi cho developer hay đề xuất fix không bắt buộc.',
  },
  {
    id: 'mx-30', type: 'single', k: 'K2', lo: 'FL-5.3.1', topic: 'management',
    stem: 'A test progress report states "85% of planned test cases executed, 90% passed". This is primarily an example of:',
    options: [
      { id: 'a', text: 'A test estimation technique' },
      { id: 'b', text: 'Test monitoring and control using metrics' },
      { id: 'c', text: 'A risk assessment' },
      { id: 'd', text: 'A defect classification scheme' },
    ],
    correct: ['b'],
    explanation: 'Theo dõi % test đã chạy/đậu so với kế hoạch là test monitoring & control bằng metric, giúp đánh giá tiến độ và đưa ra hành động điều chỉnh.',
  },

  // ===== Chapter 6: Test Tools (2) =====
  {
    id: 'mx-31', type: 'single', k: 'K2', lo: 'FL-6.1.1', topic: 'tools',
    stem: 'Which of the following is a key benefit of using test execution automation tools?',
    options: [
      { id: 'a', text: 'It removes the need for any test design' },
      { id: 'b', text: 'It enables fast, repeatable execution of regression tests' },
      { id: 'c', text: 'It guarantees the absence of defects' },
      { id: 'd', text: 'It replaces the need for human judgement entirely' },
    ],
    correct: ['b'],
    explanation: 'Lợi ích chính của test execution automation là chạy lại regression test nhanh, nhất quán và lặp lại được. Tool không thay thế thiết kế test hay phán đoán của con người.',
  },
  {
    id: 'mx-32', type: 'single', k: 'K1', lo: 'FL-6.1.1', topic: 'tools',
    stem: 'Which of the following is a potential risk of introducing a test automation tool into an organisation?',
    options: [
      { id: 'a', text: 'Underestimating the effort to maintain the automated test scripts' },
      { id: 'b', text: 'Faster execution of regression tests' },
      { id: 'c', text: 'More objective measurement of coverage' },
      { id: 'd', text: 'Easier access to information about tests' },
    ],
    correct: ['a'],
    explanation: 'Một rủi ro phổ biến là đánh giá thấp công sức bảo trì script tự động (và chi phí ban đầu, kỳ vọng phi thực tế). Các lựa chọn còn lại là lợi ích chứ không phải rủi ro.',
  },
]
