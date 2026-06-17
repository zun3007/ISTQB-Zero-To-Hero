/*
  Curated ISTQB glossary (EN term + VN gloss + definition). This list is MERGED
  with every keyTerm authored inside lessons (see GlossaryView), de-duplicated by
  the English term. Authors may extend this list; lesson keyTerms are auto-included.
*/

export const glossary = [
  // ----- Quality & fundamentals -----
  { en: 'Quality', vn: 'Chất lượng', def: 'Mức độ mà một thành phần hoặc hệ thống đáp ứng nhu cầu và kỳ vọng (đã nêu hoặc ngầm hiểu) của các bên liên quan.' },
  { en: 'Quality assurance', vn: 'Đảm bảo chất lượng', def: 'Các hoạt động tập trung vào việc tuân thủ quy trình nhằm tạo niềm tin rằng các yêu cầu chất lượng sẽ được đáp ứng.' },
  { en: 'Error', vn: 'Lỗi (sai sót con người)', def: 'Hành động của con người tạo ra kết quả không chính xác (còn gọi là mistake).' },
  { en: 'Defect', vn: 'Khuyết tật', def: 'Một khiếm khuyết trong thành phần/hệ thống có thể khiến nó không thực hiện đúng chức năng yêu cầu (còn gọi là bug/fault).' },
  { en: 'Failure', vn: 'Hỏng hóc', def: 'Sự kiện hệ thống hoặc thành phần không thực hiện đúng chức năng yêu cầu trong giới hạn đã xác định.' },
  { en: 'Root cause', vn: 'Nguyên nhân gốc rễ', def: 'Nguồn gốc cơ bản của một vấn đề; nếu loại bỏ nó thì vấn đề sẽ giảm bớt hoặc không tái diễn.' },
  { en: 'Verification', vn: 'Thẩm tra', def: 'Việc xác nhận, thông qua bằng chứng khách quan, rằng các yêu cầu đã chỉ định được đáp ứng (xây dựng sản phẩm đúng cách).' },
  { en: 'Validation', vn: 'Xác nhận', def: 'Việc xác nhận, thông qua bằng chứng khách quan, rằng các yêu cầu cho mục đích sử dụng dự kiến được đáp ứng (xây dựng đúng sản phẩm).' },

  // ----- Testing concepts -----
  { en: 'Testing', vn: 'Kiểm thử', def: 'Tập hợp các hoạt động nhằm phát hiện defect và đánh giá chất lượng của các sản phẩm công việc phần mềm.' },
  { en: 'Test objective', vn: 'Mục tiêu kiểm thử', def: 'Lý do hoặc mục đích của việc kiểm thử (ví dụ: tìm defect, tạo niềm tin, cung cấp thông tin để ra quyết định).' },
  { en: 'Test basis', vn: 'Cơ sở kiểm thử', def: 'Nguồn thông tin dùng để rút ra test case (yêu cầu, thiết kế, code, phân tích rủi ro...).' },
  { en: 'Test condition', vn: 'Điều kiện kiểm thử', def: 'Một khía cạnh có thể kiểm thử của một thành phần/hệ thống được xác định làm cơ sở cho test case.' },
  { en: 'Test case', vn: 'Ca kiểm thử', def: 'Tập gồm tiền điều kiện, đầu vào, kết quả mong đợi và hậu điều kiện, được phát triển cho một mục tiêu test cụ thể.' },
  { en: 'Test data', vn: 'Dữ liệu kiểm thử', def: 'Dữ liệu được tạo hoặc lựa chọn để đáp ứng các điều kiện đầu vào khi thực thi test case.' },
  { en: 'Test suite', vn: 'Bộ kiểm thử', def: 'Tập hợp các test case hoặc thủ tục test được thực thi trong một chu kỳ test cụ thể.' },
  { en: 'Test procedure', vn: 'Thủ tục kiểm thử', def: 'Một chuỗi test case theo trình tự thực thi cùng các hành động chuẩn bị và kết thúc cần thiết.' },
  { en: 'Test oracle', vn: 'Bộ phán định kết quả', def: 'Nguồn để xác định kết quả mong đợi nhằm so sánh với kết quả thực tế của hệ thống.' },
  { en: 'Test environment', vn: 'Môi trường kiểm thử', def: 'Tập hợp phần cứng, phần cụ, phần mềm mô phỏng và cấu hình cần thiết để thực thi test.' },
  { en: 'Coverage', vn: 'Độ phủ', def: 'Tỷ lệ phần trăm các phần tử coverage đã được test thực hiện, đo bằng một thang đo độ phủ.' },
  { en: 'Traceability', vn: 'Khả năng truy vết', def: 'Khả năng liên kết hai chiều giữa các sản phẩm công việc, ví dụ giữa cơ sở kiểm thử, test case và kết quả test.' },

  // ----- Test process & management -----
  { en: 'Test plan', vn: 'Kế hoạch kiểm thử', def: 'Tài liệu mô tả mục tiêu, nguồn lực, lịch trình, phạm vi và phương pháp tiếp cận cho hoạt động test.' },
  { en: 'Entry criteria', vn: 'Tiêu chí đầu vào', def: 'Tập hợp điều kiện cần đáp ứng trước khi có thể bắt đầu chính thức một hoạt động test.' },
  { en: 'Exit criteria', vn: 'Tiêu chí đầu ra', def: 'Tập hợp điều kiện cần đáp ứng để chính thức kết thúc một hoạt động test (còn gọi là definition of done).' },
  { en: 'Test monitoring', vn: 'Giám sát kiểm thử', def: 'Hoạt động thu thập, kiểm tra và báo cáo thông tin về tình trạng test để so với kế hoạch.' },
  { en: 'Test control', vn: 'Kiểm soát kiểm thử', def: 'Các hành động điều chỉnh được thực hiện để đưa tiến độ test trở lại đúng kế hoạch.' },
  { en: 'Defect report', vn: 'Báo cáo khuyết tật', def: 'Tài liệu ghi nhận và mô tả một defect được phát hiện, phục vụ phân tích và xử lý (bug report).' },
  { en: 'Risk', vn: 'Rủi ro', def: 'Yếu tố có thể dẫn đến hậu quả tiêu cực trong tương lai, được đo bằng khả năng xảy ra và mức tác động.' },
  { en: 'Product risk', vn: 'Rủi ro sản phẩm', def: 'Rủi ro liên quan đến việc sản phẩm có thể không đáp ứng nhu cầu hợp pháp của người dùng hoặc bên liên quan.' },
  { en: 'Project risk', vn: 'Rủi ro dự án', def: 'Rủi ro liên quan đến việc quản lý và kiểm soát dự án test (nguồn lực, thời gian, nhà cung cấp...).' },
  { en: 'Risk-based testing', vn: 'Kiểm thử dựa trên rủi ro', def: 'Phương pháp test trong đó các hoạt động được lựa chọn, ưu tiên và phân bổ dựa trên mức độ rủi ro.' },

  // ----- Test levels & types -----
  { en: 'Test level', vn: 'Cấp độ kiểm thử', def: 'Nhóm các hoạt động test được tổ chức và quản lý cùng nhau (Component, Integration, System, Acceptance).' },
  { en: 'Component testing', vn: 'Kiểm thử thành phần', def: 'Cấp độ test tập trung kiểm tra riêng lẻ từng thành phần (unit/module) đã được tách biệt.' },
  { en: 'Integration testing', vn: 'Kiểm thử tích hợp', def: 'Cấp độ test tập trung vào sự tương tác và giao tiếp giữa các thành phần hoặc hệ thống.' },
  { en: 'System testing', vn: 'Kiểm thử hệ thống', def: 'Cấp độ test tập trung kiểm tra hành vi và khả năng của toàn bộ hệ thống tích hợp hoàn chỉnh.' },
  { en: 'Acceptance testing', vn: 'Kiểm thử chấp nhận', def: 'Cấp độ test nhằm xác lập niềm tin rằng hệ thống sẵn sàng triển khai và đáp ứng nhu cầu người dùng.' },
  { en: 'Test type', vn: 'Loại kiểm thử', def: 'Nhóm hoạt động test nhằm vào các đặc tính chất lượng cụ thể (chức năng, phi chức năng, cấu trúc, hồi quy...).' },
  { en: 'Functional testing', vn: 'Kiểm thử chức năng', def: 'Test đánh giá xem hệ thống có thực hiện đúng các chức năng được yêu cầu hay không (làm cái gì).' },
  { en: 'Non-functional testing', vn: 'Kiểm thử phi chức năng', def: 'Test đánh giá các đặc tính như hiệu năng, bảo mật, khả dụng, tương thích (làm tốt như thế nào).' },
  { en: 'Regression testing', vn: 'Kiểm thử hồi quy', def: 'Test lại để phát hiện defect mới phát sinh do thay đổi (side-effect) trong phần đã hoạt động tốt trước đó.' },
  { en: 'Confirmation testing', vn: 'Kiểm thử xác nhận', def: 'Test lại để xác nhận một defect đã thực sự được sửa thành công (re-testing/retesting).' },
  { en: 'Smoke testing', vn: 'Kiểm thử khói', def: 'Tập con test cơ bản nhằm xác nhận các chức năng then chốt hoạt động trước khi tiếp tục test sâu hơn.' },

  // ----- Static testing & reviews -----
  { en: 'Static testing', vn: 'Kiểm thử tĩnh', def: 'Test sản phẩm công việc mà không thực thi code, thông qua xem xét thủ công (review) hoặc phân tích tĩnh tự động.' },
  { en: 'Dynamic testing', vn: 'Kiểm thử động', def: 'Test bằng cách thực thi phần mềm trên dữ liệu test để quan sát hành vi của nó.' },
  { en: 'Review', vn: 'Rà soát', def: 'Hoạt động đánh giá sản phẩm công việc nhằm phát hiện vấn đề và đề xuất cải tiến.' },
  { en: 'Walkthrough', vn: 'Diễn giải', def: 'Loại review trong đó tác giả dẫn dắt người tham gia đi qua sản phẩm công việc để thu thập phản hồi.' },
  { en: 'Inspection', vn: 'Thanh tra', def: 'Loại review chính thức nhất, theo quy trình chặt chẽ với vai trò rõ ràng và đo lường, nhằm phát hiện defect.' },

  // ----- Black-box test techniques -----
  { en: 'Black-box testing', vn: 'Kiểm thử hộp đen', def: 'Kỹ thuật dựa trên đặc tả, rút test case từ hành vi bên ngoài mà không cần biết cấu trúc bên trong.' },
  { en: 'Equivalence partitioning', vn: 'Phân vùng tương đương', def: 'Kỹ thuật chia dữ liệu đầu vào thành các lớp tương đương, mỗi lớp được kỳ vọng xử lý giống nhau; chọn một đại diện mỗi lớp.' },
  { en: 'Boundary value analysis', vn: 'Phân tích giá trị biên', def: 'Kỹ thuật test các giá trị tại biên của các phân vùng tương đương, nơi defect dễ xuất hiện nhất.' },
  { en: 'Decision table testing', vn: 'Kiểm thử bảng quyết định', def: 'Kỹ thuật thiết kế test từ bảng ánh xạ các tổ hợp điều kiện sang các hành động/kết quả tương ứng.' },
  { en: 'State transition testing', vn: 'Kiểm thử chuyển trạng thái', def: 'Kỹ thuật thiết kế test dựa trên các trạng thái của hệ thống và những chuyển đổi hợp lệ/không hợp lệ giữa chúng.' },

  // ----- White-box test techniques -----
  { en: 'White-box testing', vn: 'Kiểm thử hộp trắng', def: 'Kỹ thuật dựa trên cấu trúc bên trong (code, kiến trúc, luồng) để thiết kế và đo độ phủ test.' },
  { en: 'Statement coverage', vn: 'Độ phủ câu lệnh', def: 'Thang đo tỷ lệ các câu lệnh thực thi được (executable statements) đã được test thực hiện.' },
  { en: 'Branch coverage', vn: 'Độ phủ nhánh', def: 'Thang đo tỷ lệ các nhánh (kết quả của điểm quyết định) đã được test thực hiện.' },

  // ----- Experience-based techniques -----
  { en: 'Exploratory testing', vn: 'Kiểm thử khám phá', def: 'Test phi chính thức trong đó tester đồng thời thiết kế, thực thi và học hỏi về hệ thống dựa trên kết quả.' },
  { en: 'Error guessing', vn: 'Đoán lỗi', def: 'Kỹ thuật dựa trên kinh nghiệm để dự đoán các error, defect và failure có khả năng xảy ra rồi thiết kế test nhắm tới chúng.' },
  { en: 'Checklist-based testing', vn: 'Kiểm thử dựa trên danh sách kiểm', def: 'Kỹ thuật dựa trên kinh nghiệm, tester thiết kế và thực thi test theo một danh sách các mục cần kiểm tra.' },

  // ----- Automation & SDLC -----
  { en: 'Test automation', vn: 'Tự động hóa kiểm thử', def: 'Sử dụng phần mềm để thực hiện hoặc hỗ trợ các hoạt động test như thực thi, so sánh kết quả và quản lý.' },
  { en: 'Shift-left', vn: 'Dịch chuyển sang trái', def: 'Phương pháp thực hiện test sớm trong vòng đời phát triển để phát hiện và ngăn ngừa defect càng sớm càng tốt.' },
  { en: 'DevOps', vn: 'DevOps', def: 'Phương pháp tổ chức nhằm gắn kết phát triển và vận hành thông qua văn hóa, tự động hóa và chia sẻ trách nhiệm.' },
  { en: 'CI/CD', vn: 'Tích hợp/Phân phối liên tục', def: 'Thực hành tích hợp và kiểm thử code thường xuyên (CI) cùng phân phối/triển khai tự động (CD) qua pipeline.' },

  // ----- Agile & acceptance -----
  { en: 'User story', vn: 'Câu chuyện người dùng', def: 'Mô tả ngắn một tính năng theo góc nhìn người dùng, làm cơ sở phát triển và test trong Agile.' },
  { en: 'Acceptance criteria', vn: 'Tiêu chí chấp nhận', def: 'Các điều kiện mà một user story phải thỏa mãn để được người dùng/bên liên quan chấp nhận.' },
  { en: 'ATDD', vn: 'Phát triển hướng test chấp nhận', def: 'Acceptance Test-Driven Development: viết các test chấp nhận trước, từ tiêu chí chấp nhận, để dẫn dắt phát triển.' },
  { en: 'TDD', vn: 'Phát triển hướng kiểm thử', def: 'Test-Driven Development: viết test trước, rồi viết code để vượt qua test và refactor (đỏ - xanh - tái cấu trúc).' },
  { en: 'BDD', vn: 'Phát triển hướng hành vi', def: 'Behavior-Driven Development: mô tả hành vi mong muốn bằng ngôn ngữ tự nhiên có cấu trúc (Given-When-Then) dẫn dắt phát triển.' },
]
