/* Chapter 4 — supplementary practice questions (CTFL v4.0 §4).
   Exam-realistic, calculation-heavy. IDs use "q4x-" prefix to avoid clashing
   with the in-chapter quiz ("q4-") and checkpoints ("ck-4-"). */

export default [
  {
    id: 'q4x-1',
    type: 'single',
    k: 'K3',
    lo: 'FL-4.2.1',
    topic: 'equivalence partitioning',
    stem: 'A shipping calculator classifies an order by its total weight in kg: 0 up to and including 5 kg = "small", over 5 up to and including 30 kg = "medium", over 30 kg = "large". Negative weights are rejected as invalid. Using equivalence partitioning on the INPUT weight, what is the minimum number of test cases for 100% EP coverage (valid and invalid partitions)?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4' },
      { id: 'd', text: '5' },
    ],
    correct: ['c'],
    explanation:
      'Có 4 partition: < 0 (invalid), 0–5 "small" (valid), >5–30 "medium" (valid), >30 "large" (valid). Mỗi partition cần ≥1 đại diện → 4 test case. Cái bẫy là gộp 3 dải hợp lệ thành một (ra 2) hoặc bỏ quên dải invalid (ra 3): mỗi lớp xử lý KHÁC nhau là một partition riêng, kể cả khi tất cả đều "valid".',
  },
  {
    id: 'q4x-2',
    type: 'single',
    k: 'K3',
    lo: 'FL-4.2.2',
    topic: 'boundary value analysis',
    stem: 'A withdrawal amount must be an integer from 50 to 500 (inclusive). Using 3-value boundary value analysis, how many distinct boundary values must be tested in total?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '4' },
      { id: 'c', text: '6' },
      { id: 'd', text: '8' },
    ],
    correct: ['c'],
    explanation:
      '3-value BVA lấy trước–biên–sau cho MỖI biên. Biên dưới 50 → 49, 50, 51; biên trên 500 → 499, 500, 501. Tổng 6 giá trị riêng biệt. Phương án (b) là 2-value BVA (49, 50, 500, 501); (a) chỉ là hai biên trần trụi.',
  },
  {
    id: 'q4x-3',
    type: 'single',
    k: 'K3',
    lo: 'FL-4.2.3',
    topic: 'decision table',
    stem: 'A loan approval decision table has three binary conditions: "Has income?", "Good credit score?", "Has collateral?". An applicant is APPROVED only if "Has income?" is true AND at least one of the other two conditions is true. Counting full (uncollapsed) rules, how many of the rules result in APPROVED?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4' },
      { id: 'd', text: '8' },
    ],
    correct: ['b'],
    explanation:
      'Có 2³ = 8 rule. APPROVED cần income = T VÀ (credit OR collateral). Với income = T (4 rule), loại rule mà cả credit lẫn collateral đều F → còn 3 rule APPROVED: (T,T,F), (T,F,T), (T,T,T). Income = F (4 rule) luôn bị từ chối. Bẫy: chọn 4 (quên loại trường hợp T,F,F) hoặc 8 (đếm tổng số rule chứ không phải số rule cho action APPROVED).',
  },
  {
    id: 'q4x-4',
    type: 'single',
    k: 'K3',
    lo: 'FL-4.2.3',
    topic: 'decision table',
    stem: 'A decision table has 2 binary conditions, giving 4 rules. After analysis, the second condition turns out to be irrelevant whenever the first condition is FALSE, so those rules are collapsed with a don\'t-care ("–"). What is the minimum number of test cases now needed for 100% decision table coverage?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4' },
      { id: 'd', text: '1' },
    ],
    correct: ['b'],
    explanation:
      'Ban đầu 4 rule. Hai rule có điều kiện 1 = F (cùng action bất kể điều kiện 2) được gộp thành 1 cột với "–". Còn lại 2 rule (điều kiện 1 = T) + 1 rule gộp = 3 cột → tối thiểu 3 test case. Bẫy: chọn 4 (bỏ qua việc collapse) hoặc 2 (gộp nhầm cả các rule không thể gộp).',
  },
  {
    id: 'q4x-5',
    type: 'single',
    k: 'K3',
    lo: 'FL-4.2.4',
    topic: 'state transition',
    stem: 'A media player has states Stopped, Playing and Paused with these valid transitions: Stopped --play--> Playing; Playing --pause--> Paused; Playing --stop--> Stopped; Paused --play--> Playing; Paused --stop--> Stopped. To achieve 100% valid transitions coverage (0-switch), what is the minimum number of transitions that must each be exercised at least once?',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '6' },
    ],
    correct: ['c'],
    explanation:
      'Valid transitions coverage (0-switch) yêu cầu mỗi transition (mỗi mũi tên) hợp lệ chạy ≥1 lần. Đếm các mũi tên: play (từ Stopped), pause và stop (từ Playing), play và stop (từ Paused) = 5 transition. Bẫy: chọn 3 (đếm số STATE thay vì số transition).',
  },
  {
    id: 'q4x-6',
    type: 'truefalse',
    k: 'K2',
    lo: 'FL-4.2.4',
    topic: 'state transition',
    stem: 'In state transition testing, a state table is able to expose invalid (event/state) combinations that a state diagram typically does not show, because the table lists every state/event pair including those with no valid transition.',
    correct: ['true'],
    explanation:
      'Đúng. State diagram chỉ vẽ các transition hợp lệ; state table liệt kê MỌI cặp (state × event), kể cả các ô không có transition hợp lệ — nhờ đó bộc lộ các invalid transition cần được test (all transitions coverage).',
  },
  {
    id: 'q4x-7',
    type: 'single',
    k: 'K3',
    lo: 'FL-4.3.2',
    topic: 'white-box',
    stem: 'Consider this pseudocode:\n1  read(a)\n2  read(b)\n3  if (a > 0)\n4      print("A")\n5  if (b > 0)\n6      print("B")\n7  print("end")\nA single test uses a = 5, b = 5. What statement coverage and branch coverage does this ONE test achieve?',
    options: [
      { id: 'a', text: 'Statement 100%, branch 100%' },
      { id: 'b', text: 'Statement 100%, branch 50%' },
      { id: 'c', text: 'Statement 71%, branch 50%' },
      { id: 'd', text: 'Statement 100%, branch 25%' },
    ],
    correct: ['b'],
    explanation:
      'a=5, b=5 làm cả hai IF rẽ True nên chạy hết 7 câu lệnh → statement 100%. Nhưng có 2 quyết định, mỗi quyết định 2 branch = 4 branch tổng; test mới chỉ chạy 2 nhánh True (2/4) → branch 50%. Cần thêm test với a≤0 và b≤0 để phủ hai nhánh False. Bẫy (d): quên rằng đã phủ được 2/4 branch chứ không phải 1/4.',
  },
  {
    id: 'q4x-8',
    type: 'single',
    k: 'K2',
    lo: 'FL-4.3.1',
    topic: 'white-box',
    stem: 'A unit has 25 executable statements. The current test suite achieves 60% statement coverage. How many MORE executable statements must be exercised to reach 100% statement coverage?',
    options: [
      { id: 'a', text: '10' },
      { id: 'b', text: '15' },
      { id: 'c', text: '25' },
      { id: 'd', text: '40' },
    ],
    correct: ['a'],
    explanation:
      '60% của 25 câu lệnh = 15 câu đã chạy. Để đạt 100% cần chạy đủ 25 → còn 25 − 15 = 10 câu lệnh nữa. Bẫy (b) là số câu đã chạy chứ không phải số còn thiếu; (c) là tổng số câu lệnh.',
  },
  {
    id: 'q4x-9',
    type: 'multi',
    k: 'K2',
    lo: 'FL-4.3.3',
    topic: 'white-box',
    stem: 'Which of the following are genuine benefits of white-box (structure-based) testing? (Choose TWO)',
    options: [
      { id: 'a', text: 'It can reveal executable code that is never reached by the existing black-box tests' },
      { id: 'b', text: 'It objectively measures test thoroughness against the actual code structure' },
      { id: 'c', text: 'It guarantees that all functional requirements in the specification are implemented' },
      { id: 'd', text: 'Achieving 100% branch coverage proves the software is defect-free' },
    ],
    correct: ['a', 'b'],
    explanation:
      'White-box đo độ kỹ của test một cách khách quan dựa trên cấu trúc code (b) và phơi bày code chưa từng được chạy bởi black-box tests (a). (c) sai: white-box không kiểm tra "có đủ chức năng theo đặc tả" — đó là việc của black-box. (d) sai: không độ phủ nào chứng minh phần mềm hết lỗi (nguyên lý "testing shows the presence, not the absence of defects").',
  },
  {
    id: 'q4x-10',
    type: 'multi',
    k: 'K2',
    lo: 'FL-4.4.2',
    topic: 'experience-based',
    stem: 'Which statements about exploratory testing are CORRECT? (Choose TWO)',
    options: [
      { id: 'a', text: 'Test design, execution and learning happen concurrently, with later tests shaped by earlier results' },
      { id: 'b', text: 'It is most useful when specifications are sparse or there is severe time pressure' },
      { id: 'c', text: 'It is a structure-based (white-box) technique requiring access to the source code' },
      { id: 'd', text: 'Its results are highly repeatable and coverage is easy to measure precisely' },
    ],
    correct: ['a', 'b'],
    explanation:
      'Exploratory testing kết hợp thiết kế–thực thi–học hỏi gần như đồng thời (a) và đặc biệt hữu ích khi đặc tả nghèo nàn hoặc thiếu thời gian (b). (c) sai: nó là experience-based, không cần code. (d) sai: chính vì phụ thuộc kỹ năng tester nên khó tái lập và khó đo coverage một cách hệ thống.',
  },
  {
    id: 'q4x-11',
    type: 'single',
    k: 'K2',
    lo: 'FL-4.5.1',
    topic: 'user stories',
    stem: 'During refinement, a tester argues a user story should not be accepted yet because the team cannot describe any way to confirm it is done. Which letter of INVEST is the story MOST clearly failing?',
    options: [
      { id: 'a', text: 'I — Independent' },
      { id: 'b', text: 'N — Negotiable' },
      { id: 'c', text: 'T — Testable' },
      { id: 'd', text: 'S — Small' },
    ],
    correct: ['c'],
    explanation:
      'Không nghĩ ra cách xác minh "xong" nghĩa là story thiếu acceptance criteria rõ → vi phạm chữ T (Testable). Đây chính là đóng góp đặc trưng của tester vào INVEST. Independent là về phụ thuộc story khác; Negotiable về khả năng thương lượng; Small về kích thước.',
  },
  {
    id: 'q4x-12',
    type: 'single',
    k: 'K3',
    lo: 'FL-4.5.3',
    topic: 'ATDD',
    stem: 'A story has the acceptance criterion: "Given a cart total of 100, when a 10% discount code is applied, then the payable amount is 90." Using ATDD, a tester wants to derive a sensible set of acceptance tests. Which set BEST reflects good ATDD practice?',
    options: [
      { id: 'a', text: 'One positive test only: apply a valid 10% code to a 100 cart and expect 90' },
      { id: 'b', text: 'A positive test (valid 10% code → 90) plus negative/boundary tests such as an expired code, an invalid code, and a zero/empty cart' },
      { id: 'c', text: 'Tests that exercise every branch of the discount function\'s source code' },
      { id: 'd', text: 'A single end-to-end test executed only after the developers have finished coding' },
    ],
    correct: ['b'],
    explanation:
      'ATDD rút CẢ positive lẫn negative/biên từ acceptance criteria (b): đường hạnh phúc cộng các trường hợp mã hết hạn, mã sai, giỏ rỗng… và có thể bổ sung bằng EP/BVA. (a) chỉ happy path là chưa đủ; (c) là white-box (branch coverage), không phải ATDD; (d) mâu thuẫn với bản chất test-first, cộng tác của ATDD.',
  },
]
